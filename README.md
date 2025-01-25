# ExpressMicroservice


## Best Practices
- Use CMD ["npm", "run", "dev"] only for development containers.
- For production containers:
Build the application (npm run build).
Run the pre-compiled JavaScript (npm start).

## Validate Your YAML: Run the following command to validate your YAML:

```ts
docker-compose config
```


## Create the docker
```bash
docker network create my_custom_network
```
