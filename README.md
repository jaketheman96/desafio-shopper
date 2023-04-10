# Aqui vai um mini tutorial da aplicação:

- Começamos com a tela de login ou a tela de registro, onde o usuário realiza o acesso à plataforma.

### Login:

![login-page](https://user-images.githubusercontent.com/78574045/230845102-ab39d3ce-24e0-49e6-a041-5782e54f17da.png)

### Registro: 

![register-page](https://user-images.githubusercontent.com/78574045/230845209-b652cedf-80a5-49c9-a431-5d73d3ce0245.png)

- Assim que estiver logado, o usuário será redirecionado para a página de produtos vindo diretamente do backend onde pode selecionar a quantidade de produtos que irá pedir. Assim que selecionar os produtos, o usuário deve clicar no cardzinho verde de total localizado na parte de baixo da tela para acessar o carrinho de compras, conforme o gif a seguir:

![fluxo-cart](https://user-images.githubusercontent.com/78574045/230845417-aebf83b3-559a-4f57-b218-aa88d77a7dbb.gif)

- Na tela de carrinhos é onde o usuário pode remover os produtos selecionados e também selecionar a data de entrega. Na data de entrega há uma validação que se a data de entrega for menor ou igual o dia de hoje, o botão de continuar será desativado.

![cart](https://user-images.githubusercontent.com/78574045/230848077-5b006dc4-bb82-43da-8ec2-27e0ec20148c.png)

- Após o fluxo de compra o usuário é redirecionado para a tela de Meus Pedidos.

![orders](https://user-images.githubusercontent.com/78574045/230846023-84a93467-5af4-43f7-9b9d-e1b714d78f08.png)

- Após selecionar qualquer card de pedidos, o usuário será redirecionado para a pagina de detalhes do pedido.

- Como podemos ver, temos o status dos pedidos onde há algumas validações para poder interagir com ela, por exemplo, o usuário só pode confirmar o pedido como "Entregue" quando o status estiver "A caminho", fora disso o botão de "Entregue" fica desativado.

![order-details](https://user-images.githubusercontent.com/78574045/230846321-b8ff9abe-f905-4d05-8b7c-9f61e637145b.png)

- E onde alteramos o status para "A caminho"? Temos uma tela que é especialmente para os funcionários da Shopper, onde podemos "Confirmar" os pedidos e encaminhá-los.

![employee](https://user-images.githubusercontent.com/78574045/230846921-c33cc311-6023-478d-a913-b6922e31ae1d.png)

- Tendo essa aplicação como base, podemos alterar diversas coisas, por exemplo, separar os produtos por categorias, assim o cliente terá uma melhor organização na hora de selecionar os produtos. Também podemos optar por outras validações como textos em vermelhos indicando o erro. São muitas opções, portanto encaixaremos a favor da regra de negócio da empresa.

### Muito obrigado, espero que gostem!
