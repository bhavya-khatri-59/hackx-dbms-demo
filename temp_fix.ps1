# PowerShell script to remove theme toggle from LandingPage.jsx
$content = Get-Content "src\pages\LandingPage.jsx" -Raw

# Remove the theme toggle button section
$pattern = '(?s)\s*\{/\* Theme Toggle \*/\}.*?</motion\.button>'
$newContent = $content -replace $pattern, ''

# Write back to file
$newContent | Set-Content "src\pages\LandingPage.jsx" -NoNewline
Write-Host "Theme toggle removed successfully"