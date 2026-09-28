import * as vscode from "vscode";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

export interface TemplateVariable {
  name: string;
  prompt?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  pattern?: string;
}

export interface TemplateFile {
  filename: string;
  content: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description?: string;
  language: string;
  category?: string;
  filename: string;
  variables: TemplateVariable[];
  content: string;
  children?: TemplateFile[];
}

interface TemplateConfig {
  name: string;
  description?: string;
  language?: string;
  category?: string;
  filename: string;
  variables?: TemplateVariable[];
}

export class TemplateLoader {
  private cache: TemplateDefinition[] | undefined;

  constructor(private readonly context: vscode.ExtensionContext) {}

  getTemplatesDirectory(): string {
    const codegenConfig = vscode.workspace
      .getConfiguration("codegen")
      .get<string>("templatesDirectory", "")
      .trim();

    const legacyConfig = vscode.workspace
      .getConfiguration("globalCodeGenerator")
      .get<string>("templatesDirectory", "")
      .trim();

    const configured = codegenConfig || legacyConfig;

    if (configured) {
      return configured.startsWith("~")
        ? path.join(os.homedir(), configured.slice(1))
        : configured;
    }

    return path.join(os.homedir(), ".codegen", "templates");
  }

  getLegacyTemplatesDirectory(): string {
    return path.join(os.homedir(), ".flutter-code-gen", "templates");
  }

  clearCache(): void {
    this.cache = undefined;
  }

  async loadTemplates(): Promise<TemplateDefinition[]> {
    if (this.cache) return this.cache;

    // Scan built-in templates first, then user's global directories
    const directories = [
      path.join(this.context.extensionPath, "templates"),
      this.getLegacyTemplatesDirectory(),
      this.getTemplatesDirectory()
    ];

    const result = new Map<string, TemplateDefinition>();

    for (const directory of directories) {
      const templates = await this.scanDirectory(directory);
      for (const template of templates) {
        result.set(template.id, template);
      }
    }

    this.cache = [...result.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return this.cache;
  }

  private async scanDirectory(root: string, maxDepth = 4): Promise<TemplateDefinition[]> {
    const result: TemplateDefinition[] = [];

    const exists = await fs
      .stat(root)
      .then((stat) => stat.isDirectory())
      .catch(() => false);

    if (!exists) return result;

    const findTemplates = async (currentDir: string, currentDepth: number): Promise<void> => {
      if (currentDepth > maxDepth) return;

      const entries = await fs.readdir(currentDir, { withFileTypes: true }).catch(() => []);

      const hasTemplateJson = entries.some(
        (e) => e.isFile() && e.name === "template.json"
      );

      if (hasTemplateJson) {
        const template = await this.parseTemplateDir(currentDir, root);
        if (template) {
          result.push(template);
          return;
        }
      }

      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith(".")) {
          await findTemplates(path.join(currentDir, entry.name), currentDepth + 1);
        }
      }
    };

    await findTemplates(root, 0);
    return result;
  }

  private async parseTemplateDir(
    templateDir: string,
    root: string
  ): Promise<TemplateDefinition | undefined> {
    const configPath = path.join(templateDir, "template.json");
    const configRaw = await fs.readFile(configPath, "utf8").catch(() => undefined);
    if (!configRaw) return undefined;

    try {
      const config = JSON.parse(configRaw) as TemplateConfig;

      if (!config.name || !config.filename) return undefined;

      const content = await findTemplateContent(templateDir);
      if (!content) return undefined;

      const children: TemplateFile[] = [];
      const rawChildren = (
        config as TemplateConfig & {
          children?: Array<{ filename: string; template?: string; content?: string }>;
        }
      ).children;

      if (Array.isArray(rawChildren)) {
        for (const child of rawChildren) {
          let childContent: string | undefined;
          if (child.template) {
            childContent = await fs
              .readFile(path.join(templateDir, child.template), "utf8")
              .catch(() => undefined);
          }
          if (childContent === undefined && child.content) {
            childContent = child.content;
          }
          if (childContent !== undefined && child.filename) {
            children.push({ filename: child.filename, content: childContent });
          }
        }
      }

      const relativeId = path.relative(root, templateDir).replace(/\\/g, "/");
      const relativeParts = relativeId.split("/");
      const inferredCategory = relativeParts.length > 1 ? relativeParts[0] : (config.language ?? "general");

      return {
        id: relativeId || config.name,
        name: config.name,
        description: config.description,
        language: config.language ?? inferLanguage(config.filename),
        category: config.category ?? inferredCategory,
        filename: config.filename,
        variables: config.variables ?? [],
        content,
        children
      };
    } catch {
      return undefined;
    }
  }
}

async function findTemplateContent(directory: string): Promise<string | undefined> {
  const candidates = [
    "template",
    "template.dart",
    "template.php",
    "template.tsx",
    "template.ts",
    "template.jsx",
    "template.js",
    "template.vue",
    "template.go",
    "template.py",
    "template.kt",
    "template.java",
    "template.swift",
    "template.rs",
    "template.yaml",
    "template.yml",
    "template.json5",
    "template.txt"
  ];

  for (const filename of candidates) {
    const filePath = path.join(directory, filename);
    const content = await fs.readFile(filePath, "utf8").catch(() => undefined);

    if (content !== undefined) return content;
  }

  const files = await fs.readdir(directory, { withFileTypes: true });
  const contentFile = files.find(
    (entry) =>
      entry.isFile() &&
      entry.name !== "template.json" &&
      entry.name.startsWith("template.")
  );

  if (!contentFile) return undefined;

  return fs.readFile(path.join(directory, contentFile.name), "utf8");
}

function inferLanguage(filename: string): string {
  const extension = path.extname(filename).replace(".", "").toLowerCase();
  if (extension === "dart") return "dart";
  if (extension === "php") return "php";
  if (extension === "tsx" || extension === "ts") return "typescript";
  if (extension === "jsx" || extension === "js") return "javascript";
  if (extension === "vue") return "vue";
  if (extension === "go") return "go";
  if (extension === "py") return "python";
  if (extension === "rs") return "rust";
  if (extension === "java") return "java";
  if (extension === "kt") return "kotlin";
  if (extension === "swift") return "swift";
  return extension || "text";
}
