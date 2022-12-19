const inputElement = document.querySelector("#password")

        const upperCaseCheckElement = document.querySelector("#uppercase-check")
        const numberCheckElement = document.querySelector("#number-check")
        const symbolCheckElement = document.querySelector("#symbol-check")
        const securityIndicatorBarElement = document.querySelector("#security-indicator-bar")

        let passwordLenght = 16

        function generatePassword(){
            let chars = "abcdefghijklmnopqrstuvwxyz"

            const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            const numberChars = "123456789"
            const symbolChars = "?!@&*()[]"

            if (upperCaseCheckElement.checked) {
                chars += upperCaseChars
            }

            if (numberCheckElement.checked) {
                chars += numberChars
            }

            if (symbolCheckElement.checked) {
                chars += symbolChars
            }

            let password = ""
            //For para fazer a seleção de elementos aleatórios na hora de gerar a senha:
            for (let i = 0; i < passwordLenght; i++){
                const randomNumber = Math.floor(Math.random() * chars.length)
                password += chars.substring(randomNumber, randomNumber + 1)
            }

            inputElement.value = password
            calculateQuality()
            calculateFontSize()
        }
        //Função para modificar a barra de segurança da senha: 
        function calculateQuality(){
            //20% critical -> 60% mid -> 100% password safe
            //64/64 => 100%  
            //Tamanho * 0.25 + Maiúsculas * 0.15 + Números * 0.25 + Símbolos * 0.35:
            const percent = Math.round((passwordLenght / 64) * 25 + (upperCaseCheckElement ? 15 : 0) + (numberCheckElement ? 25 : 0) + (symbolCheckElement ? 35 : 0))

            securityIndicatorBarElement.style.width = `${percent}%`

            if (percent > 69){
                //password safe:
                securityIndicatorBarElement.classList.remove("critical")
                securityIndicatorBarElement.classList.remove("warning")
                securityIndicatorBarElement.classList.add("safe")
            }
            else if (percent > 50){
                //password warning:
                securityIndicatorBarElement.classList.remove("critical")
                securityIndicatorBarElement.classList.add("warning")
                securityIndicatorBarElement.classList.remove("safe")
            }
            else {
                //password critical:
                securityIndicatorBarElement.classList.add("critical")
                securityIndicatorBarElement.classList.remove("warning")
                securityIndicatorBarElement.classList.remove("safe")
            }

            if (percent >= 100) { 
                securityIndicatorBarElement.classList.add("completed")
            }
            else {
                securityIndicatorBarElement.classList.remove("completed")
            }
        }
        //Função copiar o que houver dentro do input text:
        function copy(){
            navigator.clipboard.writeText(inputElement.value)
        }
        
        function calculateFontSize(){
            if (passwordLenght > 45) {
                inputElement.classList.remove("font-sm")
                inputElement.classList.remove("font-xs")
                inputElement.classList.add("font-xxs")
            }
            else if (passwordLenght > 32) {
                inputElement.classList.remove("font-sm")
                inputElement.classList.add("font-xs")
                inputElement.classList.remove("font-xxs")                
            }
            else if (passwordLenght > 22) {
                inputElement.classList.add("font-sm")
                inputElement.classList.remove("font-xs")
                inputElement.classList.remove("font-xxs")
            }  
        }
        //Função para o range se comportar de acordo com o tamanho do input:  
        const passwordLenghtElement = document.querySelector("#password-lenght")
            passwordLenghtElement.addEventListener("input", function(){
                passwordLenght = passwordLenghtElement.value
                document.querySelector("#password-lenght-text").innerText = passwordLenght
                console.log(passwordLenght)
                generatePassword()
            })       
        //Eventos para alterar o conteúdo quando o checkbox for ativo ou não:
        upperCaseCheckElement.addEventListener('click', generatePassword)
        numberCheckElement.addEventListener('click', generatePassword)
        symbolCheckElement.addEventListener('click', generatePassword)
        
        //Evento para o botão de copiar a senha:
        document.querySelector("#copy-1").addEventListener('click', copy)
        document.querySelector("#copy-2").addEventListener('click', copy)
        //Evento para o botão gerar nova senha:
        document.querySelector("#renew").addEventListener('click', generatePassword)
        generatePassword()