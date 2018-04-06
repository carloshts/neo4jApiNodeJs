<h1>CRUD Neo4J em NodeJs</h1>
<p>Esse crud utiliza o neo4j driver que está na documentação oficial do neo4j!</p>
<h2>Comandos neo4j</h2>

<hr>
Criando Usuário

CREATE(user:Usuario{id:1,nome:"Pedro",idade:20})
<hr>
Consultando Usuário

MATCH(user:Usuario)RETURN user,ID(user)

MATCH(user:Usuario)WHERE user.nome =~ '.*a.*' RETURN user,ID(user)

MATCH(user:Usuario)WHERE user.nome =~ '(?i).*e.*' RETURN user,ID(user)
<hr>
Atualizando Usuário

MATCH (user:Usuario) WHERE ID(user)=260 
SET user.nome = "Elias Eduardo" RETURN user,ID(user)
<hr>
Deletando Usuário

MATCH (user:Usuario) WHERE ID(user)=260 
DELETE user
<hr>
Criando Relacionamento

MATCH(user1:Usuario) WHERE user1.nome = "Pedro"
CREATE(user2:Usuario{id:22,nome: "Kaio",idade:39}),(user1)-[:amigo_de{data:"31/01/2018"}]->(user2)

MATCH(user1:Usuario) WHERE user.nome = "Pedro"
CREATE(user2:Usuario{id:3,nome: "João",idade:29}),(user1)-[:amigo_de{data:"31/01/2018"}]->(user2)
<hr>
Consultando Amigos do Pedro

MATCH(user:Usuario)-[:amigo_de]-(amigos) WHERE user.nome = "Pedro" RETURN user,amigos

MATCH(user:Usuario)-[:amigo_de]-(amigos) WHERE user.nome = "Pedro" RETURN amigos

MATCH(user:Usuario)-[r:amigo_de]-(amigos) WHERE ID(user)=200 RETURN user,ID(user),r,ID(r),amigos,ID(amigos)
<hr>
Consultando Amigos com 29 anos

MATCH(user:Usuario)-[:amigo_de]-(amigos) WHERE user.nome = "Pedro" AND amigos.idade = 29 RETURN amigos
<hr>
Deletando Relacionamento

MATCH(user:Usuario)-[r:amigo_de]-(amigos) WHERE ID(user)=200 AND ID(amigos) = 220 DELETE r
