const userLogin = [
  { "email": "user1_ebac", "password": "psw!ebac@test" },
  { "email": "user2_ebac", "password": "psw!ebac@test" },
  { "email": "user3_ebac", "password": "psw!ebac@test" },
  { "email": "user4_ebac", "password": "psw!ebac@test" },
  { "email": "user5_ebac", "password": "psw!ebac@test" }
 
]

export function  usuariosLogin(){
    return userLogin[__ITER % userLogin.length]
}
