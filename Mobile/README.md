# GiTinder-Mobile

Projeto feito em React-native recriando o match do Tinder.

## Scripts Disponíveis

Na pasta do projeto você pode executar:

### `npm run adb`

Cria uma conexão da porta 3333 do emulador com a porta 3333 da máquina local.

### `npm start`

Executa o projeto em modo de desenvolvimento dentro do emulador (ou dispositivo conectado).<br>
O serviço será reiniciado sempre que houverem alterações.<br>
Qualquer problema ou erro será mostrado no console.

## Configurações do Android no Windows

Crie/Altere o arquivo `android/local.properties` com o caminho do SDK.
```
sdk.dir = E:/Android/sdk
```

Altere o arquivo `android/gradle.properties` com o caminho do JDK (que contenha um `tools.jar`).
```
android.useAndroidX=true
android.enableJetifier=true
org.gradle.java.home=C:\\Program Files\\Java\\jdk1.8.0_201 
```

Crie um BAT para executar o emulador mais rápido. Use o caminho até o `emulator.exe` e o nome do emulador anteriormente criado (com Android Studio).
```
E:\Android\sdk\tools\emulator.exe -avd Pixel_2_API_25
```

## Possíveis Problemas

Se o `adb` registrar erros no console, execute o comando:

### `adb devices`

Caso apareça o dispositivo com `unauthorized`: 

* Abra o Android Studio, selecione `Wipe Data` e execute novamente o emulador. 

### Renomear Projeto
Update displayName in app.json to the new name
Delete ios/ and android/ directories
Run react-native upgrade --legacy true
Run react-native link