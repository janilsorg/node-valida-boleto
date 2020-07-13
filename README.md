# API REST que valida linha digitável e retorna número do boleto

## Instruções para execução

### Instale as dependências
```
npm install
```

### Para desenvolvimento executa
<p>Esse script já reinicia o serviço a cada modificação feita</p>

```
npm run dev
```

### Para produção execute
```
npm start
```

### Para testar boleto de título bancário faça chamada ao método post a localhost:5000/validaboleto com o conteúdo abaixo
```
{
	"linhadigitavel": "00190.50095 40144.816069 06809.350314 3 37370000000100"
}
```

### Para testar concessionária faça chamada ao método post a localhost:5000/validaboleto com o conteúdo abaixo
```
{
	"linhadigitavel": "81770000000 0 01093659970 2 41131079703 9 00143370831 8"
}
```
