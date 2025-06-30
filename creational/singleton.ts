/** Mantém apenas uma instancia da classe e pode ser utilizado para fornecer um ponto de acesso global a essa instancia */
// O singleton protege a instancia com encapsulamento, garantindo que ela não seja acessada diretamente de fora da classe nem substituida.



class Config {
    private static instance: Config;
    private configData?: { [key: string]: string | number } = {};
    private constructor() {
        console.log("Constructor");
        this.configData = {
            apiUrl: "https://api.example.com",
            timeout: 5000,
            retries: 3
        };
    }

    public static getConfig() {
        if(!this.instance){
            this.instance = new Config();
            console.log("Config instance created");
        }
        return this.instance;
    }

    public getConfigData() {
        Config.getConfig()
        return this.configData;    
    }
}


const config = Config.getConfig();
const config2 = Config.getConfig();
console.log(config.getConfigData());
console.log(config2.getConfigData());
