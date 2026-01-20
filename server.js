const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const catalogoPrecos = {
    "Açaí Tradicional": {
        "250 Ml": 15000, "350 Ml": 20000, "500 Ml": 30000, "750ml": 35000, "1 Litro": 50000
    },
    "Açaí Completo": {
        "350 Ml": 25000, "500 Ml": 35000, "750ml": 40000, "1 Litro": 60000
    },
    "Açaí na Taça": { "500 Ml": 30000 },
    "Sorvete Gourmet": { "500 Ml": 15000 },
    "Barca de Açaí": { "500 Ml": 40000 },
    "Disco de Açaí": { "500 Ml": 60000 },
    "Banana Split": { "500 Ml": 30000 },
    "Especial Nutella": { "350 Ml": 25000, "500 Ml": 35000, "750 Ml": 45000 },
    "Açaí Tentação": { "350 Ml": 30000, "500 Ml": 40000, "750 Ml": 50000, "1 litro": 65000 },
    "Açaí Tropical": { "150ml": 12000, "200ml": 15000 },
    
    "Adicionais": {
        "Talento": 5000, "Nutella": 5000, "KitKat": 5000, "Prestígio": 5000
    }
};

app.post('/calcular-pedido', (req, res) => {
    const carrinho = req.body;
    let totalCalculado = 0;
    let resumoPedido = "";

    carrinho.forEach((item, index) => {
        let precoItem = 0;
        
        if (catalogoPrecos[item.nome] && catalogoPrecos[item.nome][item.ml]) {
            precoItem = catalogoPrecos[item.nome][item.ml];
        }

        if (item.adicionais && Array.isArray(item.adicionais)) {
            item.adicionais.forEach(add => {
                let nomeAdd = add.trim();
                if (catalogoPrecos["Adicionais"][nomeAdd]) {
                    precoItem += catalogoPrecos["Adicionais"][nomeAdd];
                }
            });
        }

        totalCalculado += precoItem;
        
        resumoPedido += `*Item ${index + 1}:* ${item.nome} (${item.ml})\n`;
        if (item.acompanhamentos && item.acompanhamentos.length) resumoPedido += `  + Acomp: ${item.acompanhamentos.join(", ")}\n`;
        if (item.adicionais && item.adicionais.length) resumoPedido += `  + Extras: ${item.adicionais.join(", ")}\n`;
        resumoPedido += `\n`;
    });

    res.json({ total: totalCalculado, mensagem: resumoPedido });
});

app.listen(3000, () => console.log("Servidor de Segurança rodando na porta 3000"));