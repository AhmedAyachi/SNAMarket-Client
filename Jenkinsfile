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
        stage("SonarQube Analysis"){
            steps {
                sh """
                    /opt/homebrew/bin/sonar-scanner \
                        -Dsonar.projectKey=SNAMarket-client \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.token=sqp_390b1679656e0a48a6ee6aa9a591d09287533dd8
                """
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