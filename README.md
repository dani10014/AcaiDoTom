# [Prime Açai](https://projeto-e-comerce.vercel.app/) 💜 

O **Prime Açai** nasceu originalmente como um projeto de treinamento pessoal, com uma estrutura de código bem básica e crua. Se você quiser ver como era a arquitetura inicial do projeto, você pode conferir neste link: [Histórico Inicial - Código Cru](https://github.com/dani10014/base-prime-acai.git).

No entanto, decidi validar o projeto no mercado real. Realizei a prospecção ativa de 20 estabelecimentos locais e fechei a venda com um cliente real. A partir disso, o projeto foi totalmente reestruturado e transformado em um sistema de ponta, focado nas regras de negócio e necessidades reais desse cliente.

## 🛠️ Funcionalidades de Alto Nível Desenvolvidas

### Logística & Geolocalização Avançada
* **Coleta de Localização Exata:** Integração para capturar a localização em tempo real do cliente.
* **Cálculo de Frete Automatizado:** Sistema que calcula a taxa de entrega dinamicamente com base na distância (KMs) até a loja, utilizando faixas de valores pré-definidas pelo proprietário no painel.

### Regras de Negócio & Checkout
* **Conversão de Moedas (Fronteira):** Sistema inteligente de conversão automática de valores entre Guarani (Gs) e Reais (R$), adaptado à realidade comercial da região.
* **Personalização Total do Produto:** O cliente pode montar o seu açai ou suco escolhendo o tamanho em ML, sabores, e selecionando exatamente o que entra ou sai do pedido (adicionais e remoções).
* **Meios de Pagamento Integrados:** Opção para o usuário escolher a forma de pagamento diretamente no fechamento do site.

### Integração Automatizada com WhatsApp
* **Montagem de Payload Dinâmico:** O sistema coleta todas as variáveis (produtos selecionados, adicionais, tamanho, endereço, frete calculado e forma de pagamento), estrutura e limpa os dados.
* **Disparo Automático:** Transforma tudo em uma mensagem perfeitamente formatada e direciona o cliente com um clique para o WhatsApp do atendente da loja.

## 🧠 Considerações Arquiteturais & Aprendizados

Como este projeto foi desenvolvido sob demanda e focado em uma entrega ágil para validação de mercado, algumas escolhas técnicas foram tomadas estrategicamente:

* **Arquitetura Simplificada:** O código foi estruturado de forma direta (focado na entrega imediata), sem foco em alta escalabilidade ou padrões complexos de design, priorizando o funcionamento bruto das regras de negócio do cliente.
* **Segurança Prática:** Por se tratar de uma aplicação estática (Front-end nativo), o sistema **não armazena dados em banco de dados** e **não processa pagamentos diretamente**. Toda a segurança sensível é delegada para o ecossistema do WhatsApp no momento do fechamento do pedido, tornando a aplicação leve e segura contra invasões de dados.

*Este projeto representa um marco importante na minha jornada, servindo como base de estudos sobre como refatorar e organizar códigos complexos em projetos futuros.*

**Imagens do projeto**

<img width="248" height="535" alt="Captura de tela_2026-08-06_15-03-50" src="https://github.com/user-attachments/assets/5619a9b5-9818-4fb4-8325-f4c3c16a09b7" />

