pipeline{
    agent { label 'my-jenkins-agent' }
    stages{
        //stage('Checkout') {
        //    steps {
        //        git branch: 'main', url: 'https://github.com/Player01Sid/cms.git'
        //    }
        //}
        stage('Build packages'){
            steps{
                echo "Building Node package"
                script{
                    dir('/home/jenkins/workspace/cms-pipeline/home'){
                        sh 'npm i'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Docker build'){
            steps{
                echo "Building docker images"
                script{
                    dir('/home/jenkins/workspace/cms-pipeline/home'){
                        sh 'docker build . -t cms-home'
                    }
                    dir('/home/jenkins/workspace/cms-pipeline/wordpress'){
                        sh 'docker build . -t cms-wordpress'
                    }
                }
            }
        }
        stage('Docker push'){
            steps{
                echo "Pushing docker images"
                script{
                    withCredentials([usernamePassword(credentialsId: 'docker_creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]){
                        sh "docker tag cms-home:latest $DOCKER_USERNAME/cms-home:${env.BUILD_ID}"
                        sh "docker tag cms-wordpress:latest $DOCKER_USERNAME/cms-wordpress:${env.BUILD_ID}"
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push $DOCKER_USERNAME/cms-home:${env.BUILD_ID}"
                        sh "docker push $DOCKER_USERNAME/cms-wordpress:${env.BUILD_ID}"
                    }
                }
            }
        }

        stage('Updating Repo'){
            steps{
                echo "Updating Repo"
                script{
                    withCredentials([sshUserPrivateKey(credentialsId: 'git_ssh', keyVariable: 'SSH_KEY')]) {
                        sh "git clone git@github.com:Player01Sid/cms-helm.git"
                        dir(cms-helm) {
                            sh ''' 
                                sed -i 's|tag: .*|tag: $${env.BUILD_ID}|g' values.yaml
                            '''
                            sh '''
                               git config user.name "Player01Sid"
                               git config user.email "siddharth1012004@gmail.com"
                               git add -A
                               git commit -m "Update image tags to ${env.BUILD_ID}"
                               git push origin master
                            '''
                        }
                    }
                }
            }
        }
        
    }
}
