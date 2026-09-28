# Change Log

All notable changes to the **CodeGen** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.1] - 2026-09-28

### Fixed
- **Open Global Templates Folder**: Fixed an issue where clicking "Open Global Templates Folder" from the Explorer context menu opened the right-clicked directory instead of `~/.codegen/templates/` due to VS Code's internal `revealFileInOS` selection override.
- **Cross-Platform OS Launcher**: Replaced `revealFileInOS` with `vscode.env.openExternal` and robust native OS fallbacks supporting macOS (`open`), Windows (`explorer.exe`), WSL (`wslview`/`xdg-open`), and Linux (`xdg-open`).
- **Safe Process Spawning**: Attached error handlers to detached child processes to prevent crashes in headless or minimal environments.
- **Path & Environment Variable Resolution**: Enhanced custom templates directory resolution supporting `~` across platforms as well as Windows (`%USERPROFILE%`, `%APPDATA%`) and Unix (`$HOME`, `${HOME}`) environment variables.

## [0.1.0] - 2026-09-28

### Initial Release - Universal CodeGen
- **Universal Architecture**: Scaffold any language or framework via global and local templates.
- **Context Menu Integration**: Right-click any directory in Explorer to access:
  - `New from Template...`: Interactive quick search across all 31 available templates.
  - `Dart / Flutter` submenu with 10 quick-access commands.
  - `Laravel` submenu with 6 quick-access commands.
  - `React` submenu with 3 quick-access commands.
  - `Go (Golang)` submenu with 8 quick-access commands.
  - `Vue` submenu with 2 quick-access commands.
  - `Python (FastAPI)` submenu with 2 quick-access commands.
- **Built-in Dart & Flutter Templates**:
  - `Create DTO`: Freezed Data Transfer Object with JSON serialization (`${NAME_SNAKE_CASE}_dto.dart`).
  - `Create Entity`: Clean Architecture domain entity model (`${NAME_SNAKE_CASE}_entity.dart`).
  - `Create Cubit Bloc Freezed`: Multi-file Bloc + Freezed State scaffolding (`${NAME_SNAKE_CASE}_bloc.dart` & `${NAME_SNAKE_CASE}_state.dart`).
  - `Create Riverpod Notifier`: Riverpod 2.x `AsyncNotifier` provider with state (`${NAME_SNAKE_CASE}_provider.dart`).
  - `Create Provider`: Flutter `ChangeNotifier` provider with loading, error, and `notifyListeners()` (`${NAME_SNAKE_CASE}_provider.dart`).
  - `Create Repository`: Clean Architecture repository interface and implementation (`${NAME_SNAKE_CASE}_repository.dart` & `${NAME_SNAKE_CASE}_repository_impl.dart`).
  - `Create Use Case`: Clean Architecture single-responsibility use case (`${NAME_SNAKE_CASE}_usecase.dart`).
  - `Create Service`: Remote HTTP / Dio API service (`${NAME_SNAKE_CASE}_service.dart`).
  - `Create Flutter Screen`: UI Screen / Page with `Scaffold`, `AppBar`, and static route (`${NAME_SNAKE_CASE}_screen.dart`).
  - `Create Flutter Widget`: Reusable `StatelessWidget` component with callbacks (`${NAME_SNAKE_CASE}_widget.dart`).
- **Built-in Laravel & PHP Templates**:
  - `Create Controller`: RESTful Resource API Controller with CRUD actions (`${NAME_PASCAL_CASE}Controller.php`).
  - `Create Model`: Eloquent Model with HasFactory, SoftDeletes, and fillable fields (`${NAME_PASCAL_CASE}.php`).
  - `Create Service`: Business logic service class with DB transactions (`${NAME_PASCAL_CASE}Service.php`).
  - `Create Repository`: Multi-file repository pattern with contract interface and Eloquent implementation (`${NAME_PASCAL_CASE}RepositoryInterface.php` & `${NAME_PASCAL_CASE}Repository.php`).
  - `Create Form Request`: Request validation and authorization class (`${NAME_PASCAL_CASE}Request.php`).
  - `Create Action`: Single-responsibility invokable action class (`${NAME_PASCAL_CASE}Action.php`).
- **Built-in React & TypeScript Templates**:
  - `Create Component`: React functional component with typed props and companion CSS module (`${NAME_PASCAL_CASE}.tsx` & `${NAME_PASCAL_CASE}.module.css`).
  - `Create Hook`: Custom React hook with state, `useCallback`, and typed return interface (`use${NAME_PASCAL_CASE}.ts`).
  - `Create Context`: React Context, Provider component, and custom `useContext` hook with error boundary guard (`${NAME_PASCAL_CASE}Context.tsx`).
- **Built-in Go (Golang) Templates**:
  - `Create Model (GORM)`: Database entity model struct with GORM tags, JSON tags, and Request/Response DTOs (`${NAME_SNAKE_CASE}.go`).
  - `Create Service`: Domain service interface and struct implementation with constructor `New${NAME_PASCAL_CASE}Service` (`${NAME_SNAKE_CASE}_service.go`).
  - `Create Repository`: Database repository interface and implementation struct (`${NAME_SNAKE_CASE}_repository.go`).
  - `Create Gin Handler`: Gin HTTP handler struct with `RegisterRoutes(rg *gin.RouterGroup)`, CRUD actions, and JSON responses (`${NAME_SNAKE_CASE}_handler.go`).
  - `Create Gin Middleware`: Custom Gin HTTP middleware with context and abort handling (`${NAME_SNAKE_CASE}_middleware.go`).
  - `Create Fiber Handler`: Fiber route handler with `RegisterRoutes(router fiber.Router)`, CRUD actions, and JSON error handling (`${NAME_SNAKE_CASE}_handler.go`).
  - `Create Fiber Middleware`: Custom Fiber HTTP middleware handler with error handling and context locals (`${NAME_SNAKE_CASE}_middleware.go`).
  - `Create HTTP Handler (net/http)`: Standard Go HTTP handler struct with `GetAll`, `GetByID`, `Create`, `Update`, `Delete` receiver methods (`${NAME_SNAKE_CASE}_handler.go`).
- **Built-in Vue 3 Templates**:
  - `Create Component`: Vue 3 Single File Component (SFC) with `<script setup lang="ts">`, props, emits, and scoped CSS (`${NAME_PASCAL_CASE}.vue`).
  - `Create Composable`: Vue 3 composable with reactive refs, computed state, and execution helpers (`use${NAME_PASCAL_CASE}.ts`).
- **Built-in Python & FastAPI Templates**:
  - `Create FastAPI Router`: FastAPI `APIRouter` with REST CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`) and HTTP status codes (`${NAME_SNAKE_CASE}_router.py`).
  - `Create Pydantic Schema`: Pydantic v2 Base, Create, Update, and Response schemas with `ConfigDict(from_attributes=True)` (`${NAME_SNAKE_CASE}_schema.py`).
- **Global Templates Engine**: Automatically loads templates from `~/.codegen/templates` (with fallback to `~/.flutter-code-gen/templates`).
- **Multi-File Scaffolding**: Support for companion files via `children` array in `template.json`.
- **Naming Transformation Engine**: Full support for `${NAME}`, `${NAME_PASCAL_CASE}`, `${NAME_CAMEL_CASE}`, `${NAME_SNAKE_CASE}`, `${NAME_KEBAB_CASE}`, `${NAME_CAPITALIZED}`, `${NAME_UPPER_CASE}`, plus smart pluralization `${NAME_PLURAL_SNAKE_CASE}`, `${NAME_PLURAL_CAMEL_CASE}`, `${NAME_PLURAL_PASCAL_CASE}`.
- **Metadata Variables**: Built-in support for `${DAY}`, `${MONTH}`, `${YEAR}`, `${HOUR}`, `${MINUTE}`, and `${USER}`.
- **IntelliJ Velocity Compatibility**: Automatically parses common IntelliJ file template capitalization expressions.
- **Configuration Settings**:
  - `codegen.templatesDirectory`: Path to custom global templates directory.
  - `codegen.overwriteExistingFiles`: Safety toggle to allow or disallow file overwrite.
