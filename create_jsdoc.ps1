# PowerShell-Skript zum Erstellen von JSDoc-Kommentaren
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# Definieren der Quellverzeichnisse und des Zielverzeichnisses für JSDoc als Array
$BaseDir = "C:\Users\phoen\Desktop\localProjects\"
$ProjectDir = "join"
$AdditionalDir = "www\assets\js"
$SourceDirs = @(
    "$BaseDir$ProjectDir\$AdditionalDir",
    "$BaseDir$ProjectDir\$AdditionalDir\login"
)
$JSDocDir = "$BaseDir$ProjectDir\release\jsdoc"

# Überprüfen, ob das Zielverzeichnis für JSDoc existiert, andernfalls erstellen
if (-not (Test-Path -Path $JSDocDir)) {
    New-Item -ItemType Directory -Path $JSDocDir | Out-Null
}

# Durchlaufen der Quellverzeichnisse
foreach ($SourceDir in $SourceDirs) {
    if (Test-Path -Path $SourceDir -PathType Container) {
        # JSDoc-Kommentare generieren für das aktuelle Quellverzeichnis
        npx jsdoc $SourceDir -d $JSDocDir
    } else {
        Write-Warning "Fehler: Das Quellverzeichnis '$SourceDir' existiert nicht oder kann nicht gefunden werden."
    }
}

# Erfolgsmeldung anzeigen
Write-Output "JSDoc-Kommentare erfolgreich für Dateien in den Verzeichnissen $SourceDirs erstellt und im Verzeichnis $JSDocDir gespeichert."