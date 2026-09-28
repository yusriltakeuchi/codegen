import * as vscode from "vscode";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import * as crypto from "node:crypto";
import { TemplateLoader, TemplateDefinition } from "./template-loader";
import { renderTemplate } from "./template-engine";

let loader: TemplateLoader;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  loader = new TemplateLoader(context);

  // Universal: QuickPick with all templates
  const newFromTemplateDisposable = vscode.commands.registerCommand(
    "codegen.newFileFromTemplate",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource);
    }
  );

  // Dart / Flutter specific commands
  const dartDtoDisposable = vscode.commands.registerCommand(
    "codegen.dart.createDto",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/dto");
    }
  );

  const dartEntityDisposable = vscode.commands.registerCommand(
    "codegen.dart.createEntity",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/entity");
    }
  );

  const dartBlocDisposable = vscode.commands.registerCommand(
    "codegen.dart.createBloc",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/bloc-freezed");
    }
  );

  const dartRepoDisposable = vscode.commands.registerCommand(
    "codegen.dart.createRepository",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/repository");
    }
  );

  const dartServiceDisposable = vscode.commands.registerCommand(
    "codegen.dart.createService",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/service");
    }
  );

  const dartRiverpodDisposable = vscode.commands.registerCommand(
    "codegen.dart.createRiverpod",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/riverpod");
    }
  );

  const dartProviderDisposable = vscode.commands.registerCommand(
    "codegen.dart.createProvider",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/provider");
    }
  );

  const dartScreenDisposable = vscode.commands.registerCommand(
    "codegen.dart.createScreen",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/screen");
    }
  );

  const dartWidgetDisposable = vscode.commands.registerCommand(
    "codegen.dart.createWidget",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/widget");
    }
  );

  const dartUseCaseDisposable = vscode.commands.registerCommand(
    "codegen.dart.createUseCase",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dart/usecase");
    }
  );

  // Laravel specific commands
  const laravelControllerDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createController",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/controller");
    }
  );

  const laravelModelDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createModel",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/model");
    }
  );

  const laravelServiceDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createService",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/service");
    }
  );

  const laravelRepoDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createRepository",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/repository");
    }
  );

  const laravelRequestDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createRequest",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/request");
    }
  );

  const laravelActionDisposable = vscode.commands.registerCommand(
    "codegen.laravel.createAction",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "laravel/action");
    }
  );

  // React specific commands
  const reactComponentDisposable = vscode.commands.registerCommand(
    "codegen.react.createComponent",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "react/component");
    }
  );

  const reactHookDisposable = vscode.commands.registerCommand(
    "codegen.react.createHook",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "react/hook");
    }
  );

  const reactContextDisposable = vscode.commands.registerCommand(
    "codegen.react.createContext",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "react/context");
    }
  );

  // Golang specific commands
  const golangHandlerDisposable = vscode.commands.registerCommand(
    "codegen.golang.createHandler",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/handler");
    }
  );

  const golangServiceDisposable = vscode.commands.registerCommand(
    "codegen.golang.createService",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/service");
    }
  );

  const golangRepoDisposable = vscode.commands.registerCommand(
    "codegen.golang.createRepository",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/repository");
    }
  );

  const golangModelDisposable = vscode.commands.registerCommand(
    "codegen.golang.createModel",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/model");
    }
  );

  const golangGinHandlerDisposable = vscode.commands.registerCommand(
    "codegen.golang.createGinHandler",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/gin-handler");
    }
  );

  const golangGinMiddlewareDisposable = vscode.commands.registerCommand(
    "codegen.golang.createGinMiddleware",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/gin-middleware");
    }
  );

  const golangFiberHandlerDisposable = vscode.commands.registerCommand(
    "codegen.golang.createFiberHandler",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/fiber-handler");
    }
  );

  const golangFiberMiddlewareDisposable = vscode.commands.registerCommand(
    "codegen.golang.createFiberMiddleware",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "golang/fiber-middleware");
    }
  );

  // Vue specific commands
  const vueComponentDisposable = vscode.commands.registerCommand(
    "codegen.vue.createComponent",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "vue/component");
    }
  );

  const vueComposableDisposable = vscode.commands.registerCommand(
    "codegen.vue.createComposable",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "vue/composable");
    }
  );

  // Python specific commands
  const pythonRouterDisposable = vscode.commands.registerCommand(
    "codegen.python.createRouter",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "python/router");
    }
  );

  const pythonSchemaDisposable = vscode.commands.registerCommand(
    "codegen.python.createSchema",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "python/schema");
    }
  );

  // Management commands
  const refreshDisposable = vscode.commands.registerCommand(
    "codegen.refreshTemplates",
    async () => {
      loader.clearCache();
      await vscode.window.showInformationMessage("CodeGen: Templates cache refreshed successfully.");
    }
  );

  const openTemplatesDirDisposable = vscode.commands.registerCommand(
    "codegen.openTemplatesFolder",
    async () => {
      const templatesDir = loader.getTemplatesDirectory();
      await fs.mkdir(templatesDir, { recursive: true });
      await vscode.commands.executeCommand("revealFileInOS", vscode.Uri.file(templatesDir));
    }
  );

  // Legacy command aliases for backwards-compatibility
  const legacyDtoDisposable = vscode.commands.registerCommand(
    "globalCodeGenerator.createDto",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "dto");
    }
  );

  const legacyEntityDisposable = vscode.commands.registerCommand(
    "globalCodeGenerator.createEntity",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "entity");
    }
  );

  const legacyBlocDisposable = vscode.commands.registerCommand(
    "globalCodeGenerator.createBloc",
    async (resource?: vscode.Uri) => {
      await createFromTemplate(resource, "bloc");
    }
  );

  const legacyRefreshDisposable = vscode.commands.registerCommand(
    "globalCodeGenerator.refreshTemplates",
    async () => {
      loader.clearCache();
      await vscode.window.showInformationMessage("CodeGen templates refreshed.");
    }
  );

  context.subscriptions.push(
    newFromTemplateDisposable,
    dartDtoDisposable,
    dartEntityDisposable,
    dartBlocDisposable,
    dartRiverpodDisposable,
    dartProviderDisposable,
    dartRepoDisposable,
    dartUseCaseDisposable,
    dartServiceDisposable,
    dartScreenDisposable,
    dartWidgetDisposable,
    laravelControllerDisposable,
    laravelModelDisposable,
    laravelServiceDisposable,
    laravelRepoDisposable,
    laravelRequestDisposable,
    laravelActionDisposable,
    reactComponentDisposable,
    reactHookDisposable,
    reactContextDisposable,
    golangHandlerDisposable,
    golangServiceDisposable,
    golangRepoDisposable,
    golangModelDisposable,
    golangGinHandlerDisposable,
    golangGinMiddlewareDisposable,
    golangFiberHandlerDisposable,
    golangFiberMiddlewareDisposable,
    vueComponentDisposable,
    vueComposableDisposable,
    pythonRouterDisposable,
    pythonSchemaDisposable,
    refreshDisposable,
    openTemplatesDirDisposable,
    legacyDtoDisposable,
    legacyEntityDisposable,
    legacyBlocDisposable,
    legacyRefreshDisposable
  );
}

export function deactivate(): void { }

async function createFromTemplate(
  resource?: vscode.Uri,
  templateQuery?: string
): Promise<void> {
  const targetFolder = await resolveTargetFolder(resource);
  if (!targetFolder) return;

  let templates: TemplateDefinition[];
  try {
    templates = await loader.loadTemplates();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`Cannot load templates: ${message}`);
    return;
  }

  if (templates.length === 0) {
    const templatesDir = loader.getTemplatesDirectory();
    const action = await vscode.window.showWarningMessage(
      `No templates found in ${templatesDir}.`,
      "Open Templates Folder"
    );

    if (action === "Open Templates Folder") {
      await fs.mkdir(templatesDir, { recursive: true });
      await vscode.commands.executeCommand(
        "revealFileInOS",
        vscode.Uri.file(templatesDir)
      );
    }
    return;
  }

  let selectedTemplate: TemplateDefinition | undefined;

  if (templateQuery) {
    const q = templateQuery.toLowerCase();
    selectedTemplate =
      templates.find((t) => t.id.toLowerCase() === q || t.id.toLowerCase().endsWith(`/${q}`)) ||
      templates.find((t) => t.name.toLowerCase() === q) ||
      templates.find((t) => {
        const id = t.id.toLowerCase();
        const name = t.name.toLowerCase();
        const filename = t.filename.toLowerCase();
        return id.includes(q) || name.includes(q) || filename.includes(q);
      });
  }

  if (!selectedTemplate) {
    const selected = await vscode.window.showQuickPick(
      templates.map((template) => {
        const cat = (template.category ?? template.language).toUpperCase();
        return {
          label: `[${cat}] ${template.name}`,
          description: template.description,
          detail: `${template.language} → ${template.filename}`,
          template
        };
      }),
      {
        placeHolder: "Select a template to generate...",
        matchOnDescription: true,
        matchOnDetail: true
      }
    );

    if (!selected) return;
    selectedTemplate = selected.template;
  }

  const variables = await collectVariables(selectedTemplate, targetFolder);
  if (!variables) return;

  const renderedFiles = [
    {
      filename: renderTemplate(selectedTemplate.filename, variables),
      content: renderTemplate(selectedTemplate.content, variables)
    },
    ...(selectedTemplate.children ?? []).map((child) => ({
      filename: renderTemplate(child.filename, variables),
      content: renderTemplate(child.content, variables)
    }))
  ];

  const allowOverwrite =
    vscode.workspace
      .getConfiguration("codegen")
      .get<boolean>("overwriteExistingFiles") ??
    vscode.workspace
      .getConfiguration("globalCodeGenerator")
      .get<boolean>("overwriteExistingFiles", false);

  const existingFiles: string[] = [];
  for (const file of renderedFiles) {
    const outputPath = path.join(targetFolder.fsPath, file.filename);
    if (await fileExists(outputPath)) existingFiles.push(outputPath);
  }

  if (existingFiles.length > 0 && !allowOverwrite) {
    const action = await vscode.window.showWarningMessage(
      `These files already exist:\n${existingFiles.join("\n")}`,
      "Overwrite",
      "Cancel"
    );

    if (action !== "Overwrite") return;
  }

  await fs.mkdir(targetFolder.fsPath, { recursive: true });

  const outputPaths: string[] = [];
  for (const file of renderedFiles) {
    const outputPath = path.join(targetFolder.fsPath, file.filename);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, file.content, "utf8");
    outputPaths.push(outputPath);
  }

  if (outputPaths.length > 0) {
    const firstDocument = await vscode.workspace.openTextDocument(outputPaths[0]);
    await vscode.window.showTextDocument(firstDocument);

    vscode.window.showInformationMessage(
      `CodeGen: Generated ${outputPaths.length} file${outputPaths.length === 1 ? "" : "s"}: ${renderedFiles.map((f) => f.filename).join(", ")}`
    );
  }
}

async function resolveTargetFolder(resource?: vscode.Uri): Promise<vscode.Uri | undefined> {
  if (resource?.scheme === "file") {
    const stat = await fs.stat(resource.fsPath).catch(() => undefined);
    if (stat?.isDirectory()) {
      return resource;
    }
    if (stat?.isFile()) {
      return vscode.Uri.file(path.dirname(resource.fsPath));
    }
  }

  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor?.document.uri.scheme === "file") {
    return vscode.Uri.file(path.dirname(activeEditor.document.uri.fsPath));
  }

  const folders = vscode.workspace.workspaceFolders;

  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage("Open a project/workspace first.");
    return undefined;
  }

  if (folders.length === 1) {
    return folders[0].uri;
  }

  const selected = await vscode.window.showWorkspaceFolderPick({
    placeHolder: "Select the target workspace folder..."
  });

  return selected?.uri;
}

async function collectVariables(
  template: TemplateDefinition,
  targetFolder?: vscode.Uri
): Promise<Record<string, string> | undefined> {
  const variables: Record<string, string> = {};

  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours24 >= 12 ? "PM" : "AM";

  const targetFolderName = targetFolder ? path.basename(targetFolder.fsPath) : "";
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  const workspaceName = workspaceFolder ? path.basename(workspaceFolder.uri.fsPath) : "";

  const systemVariables: Record<string, string> = {
    // User & environment
    USER: os.userInfo().username,
    HOSTNAME: os.hostname(),
    PLATFORM: os.platform(),

    // Calendar & Date
    YEAR: String(year),
    YEAR_SHORT: String(year).slice(-2),
    MONTH: pad(month),
    MONTH_NAME: monthNames[month - 1],
    MONTH_NAME_SHORT: monthNames[month - 1].slice(0, 3),
    DAY: pad(day),
    DAY_NAME: dayNames[now.getDay()],
    DAY_NAME_SHORT: dayNames[now.getDay()].slice(0, 3),
    DATE: `${year}-${pad(month)}-${pad(day)}`,
    DATE_EU: `${pad(day)}/${pad(month)}/${year}`,
    DATE_US: `${pad(month)}/${pad(day)}/${year}`,

    // Time
    HOUR: pad(hours24),
    HOUR_12: pad(hours12),
    MINUTE: pad(minutes),
    SECOND: pad(seconds),
    AM_PM: ampm,
    TIME: `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`,
    TIME_12: `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`,

    // Timestamps
    TIMESTAMP: String(Math.floor(now.getTime() / 1000)),
    TIMESTAMP_MS: String(now.getTime()),
    ISO_TIMESTAMP: now.toISOString(),

    // Unique IDs & Random Generators
    UUID: crypto.randomUUID(),
    UUID_SIMPLE: crypto.randomUUID().replace(/-/g, ""),
    RANDOM_HEX: crypto.randomBytes(4).toString("hex"),
    RANDOM_INT: String(Math.floor(1000 + Math.random() * 9000)),

    // Context & Folder info
    TARGET_FOLDER: targetFolderName,
    WORKSPACE_NAME: workspaceName
  };

  for (const variable of template.variables) {
    const value = await vscode.window.showInputBox({
      prompt: variable.prompt ?? `Enter ${variable.name}`,
      placeHolder: variable.placeholder ?? variable.name,
      value: variable.defaultValue ?? "",
      validateInput: (input) => {
        if (variable.required && input.trim().length === 0) {
          return `${variable.name} is required.`;
        }

        if (variable.pattern) {
          try {
            const regex = new RegExp(variable.pattern);
            if (!regex.test(input)) {
              return `Invalid ${variable.name}.`;
            }
          } catch {
            // Ignore invalid template regex rather than blocking generation.
          }
        }

        return undefined;
      }
    });

    if (value === undefined) return undefined;

    variables[variable.name] = value.trim();
  }

  return { ...systemVariables, ...variables };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
