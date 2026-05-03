import { faker } from '@faker-js/faker'

class Utils {
    
    criarEmail(){
        return faker.internet.email()
    }

    criarSenha(){
        return faker.internet.password()
    }

}

export default new Utils()