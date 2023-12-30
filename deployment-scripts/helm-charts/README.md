### Using kubernetes helm charts in this directory
1. create a namespace for example threatmapper
```sh 
kubectl create ns threatmapper
```
2. Install toae router helm chart 
```sh 
helm install router ./toae-router --namespace threatmapper
```
3. Install toae console helm chart 
```sh
helm install console ./toae-console --namespace threatmapper
```
4. wait for all the services to start, access to console ui depends on router service type
5. to customize the installation refer values.yaml of toae-console and toae-router