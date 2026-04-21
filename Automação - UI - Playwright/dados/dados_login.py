LOGIN_VALIDO = {"email": "admin", "senha": "admin123"}

LOGIN_INVALIDO = [("admin", "senhaErrada", "A senha informada para o usuário admin está incorreta."), 
                  ("userErrado", "admin123", "O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."), 
                  ("userErrado", "senhaErrada", "O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."),
                  ("", "senhaErrada", "Nome de usuário é obrigatório."),
                  ("admin", "", "O campo da senha está vazio"),
                  ("", "", "Nome de usuário é obrigatório."),
                ]