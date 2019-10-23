# star_line_bot_backend

[Line好友連結](https://line.me/R/ti/p/%40bxc5238x)

## 資料庫

### 創建Model

```
docker-compose run app sequelize-cli model:generate --name <model name> --attributes <attribute list>
```

e.g.

```
docker-compose run app sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### Migrate

Running

```
docker-compose run app npm run db:migrate
```

Undo

```
docker-compose run app sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-xxxx.js
```