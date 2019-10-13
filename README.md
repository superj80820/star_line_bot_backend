# star_line_bot_backend

## DB

### Create model

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

## Ref:
* db
https://gist.github.com/akosveres/b7f9173ccb7b00a8db67e5149f410bb5
https://gist.github.com/jcavat/2ed51c6371b9b488d6a940ba1049189b
https://ithelp.ithome.com.tw/articles/10200754?sc=pt
[If db can't connect](https://stackoverflow.com/questions/45399941/node-js-connect-to-mysql-docker-container-econnrefused)

* node
https://ithelp.ithome.com.tw/articles/10193307

* docker
https://github.com/b00giZm/docker-compose-nodejs-examples/blob/master/03-express-gulp-watch/Dockerfile

---

# temp

使用目前使用者進入docker的方法 [Ref](https://medium.com/redbubble/running-a-docker-container-as-a-non-root-user-7d2e00f8ee15)

## 建立專案

```
CURRENT_UID=$(id -u):$(id -g) docker-compose run app django-admin startproject app .
```

## 建立app

```
CURRENT_UID=$(id -u):$(id -g) docker-compose run app npm init
```

## makemigrations

```
docker-compose run app pipenv run python manage.py makemigrations
```

## migrate

```
docker-compose run app pipenv run python manage.py migrate
```

## createsuperuser

```
docker-compose run app pipenv run python manage.py createsuperuser
```

## Ref

* [Docker mysql](https://stackoverflow.com/questions/46004648/how-to-setup-mysql-with-utf-8-using-docker-compose)