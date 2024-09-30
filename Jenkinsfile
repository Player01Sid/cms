pipeline{
    agent { label 'my-jenkins-agent' }
    stages{
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Player01Sid/cms.git'
                sh 'pwd'
                sh 'ls -l'
            }
        }
        stage('Build packages'){
            steps{
                echo "Building Node package"
                sh '''
                    cd ./home
                    ls -l
                    npm i
                    npm run build
                '''
            }
        }
        stage('Docker build'){
            steps{
                echo "Building docker images"
                sh '''
                    cd /home/jenkins/workspace/cms-pipeline/home
                    pwd
                    ls -l
                    docker build . -t cms-home
                    cd ../wordpress
                    docker build . -t cms-wordpress
                '''
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying"
                
                sh '''
                    docker images
                    docker run -d -p 3000:3000 cms-home
                    docker run -d -p 81:80 cms-wordpress
                '''
            }
        }
        
    }
}
