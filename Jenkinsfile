pipeline {
    agent any
    tools {
        nodejs "local"
    }

    stages {
        stage("Initialize"){
            steps {
                git url:"https://github.com/AhmedAyachi/SNAMarket-Client",branch:"beta"
                script {
                    def commit = sh(script:"git log -1 --oneline",returnStdout:true)
                    currentBuild.displayName=commit
                }
            }
        }
        stage("Set Browser Platform"){
            steps{
                catchError(buildResult:"SUCCESS",stageResult:"FAILURE") {
                    sh """
                        npm i &&
                        cordova platform add browser@7
                    """
                }
            }
        }
        stage("Update Docker Image"){
            steps {
                sh """
                    docker build -t ahmedayachi/snamarket-client:latest .
                    docker push ahmedayachi/snamarket-client:latest
                """
                
            }
        }
    }
}
