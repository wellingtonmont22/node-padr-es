export class LogLevel {
  constructor(
    public readonly name: "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL",
    public readonly emoji: string,
    public readonly priority: number
  ) {}
}

export class LevelFactory {
  private static cache = new Map<string, LogLevel>();

  static get(name: LogLevel["name"]): LogLevel {
    if (!this.cache.has(name)) {
      const levelMap: Record<LogLevel["name"], LogLevel> = {
        DEBUG: new LogLevel("DEBUG", "🐞", 10),
        INFO : new LogLevel("INFO" , "ℹ️", 20),
        WARN : new LogLevel("WARN" , "⚠️", 30),
        ERROR: new LogLevel("ERROR", "❌", 40),
        FATAL: new LogLevel("FATAL", "💀", 50)
      };
      this.cache.set(name, levelMap[name]);
    }
    return this.cache.get(name)!;
  }
}

interface LogEvent {
  timestamp: number;
  message: string;
  level: LogLevel;   
}

function log(msg: string, levelName: LogLevel["name"] = "INFO") {
  const event: LogEvent = {
    timestamp: Date.now(),
    message: msg,
    level: LevelFactory.get(levelName)
  };
  
  console.log(
    `${event.level.emoji} [${event.level.name}] ${new Date(event.timestamp).toISOString()} — ${event.message}`
  );
}

log("Servidor iniciado");
log("Arquivo não encontrado", "WARN");
log("Falha ao conectar no DB", "ERROR");
