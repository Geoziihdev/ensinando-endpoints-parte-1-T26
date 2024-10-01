while ($true) {
    $name = Read-Host "Cesar"
    $email = Read-Host "cesar@hotmail.com"
    $password = Read-Host ""

    $body = @{
        name = $name
        email = $email
        password = $password
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri http://localhost:8080/users -Method Post -Body $body -ContentType "application/json"
        Write-Host "Usuário criado: $($response | ConvertTo-Json -Depth 4)"
    } catch {
        Write-Host "Erro ao criar usuário: $_"
    }
    
    $continue = Read-Host "Deseja criar outro usuário? (s/n)"
    if ($continue -ne "s") {
        break
    }
}

