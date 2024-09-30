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
                sh '''
                    cd ./home
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
                    docker run -d -p 3000:3000 --name cms-home cms-home
                    docker run -d -p 81:80 --name cms-wordpress cms-wordpress
                '''
            }
        }
        
    }
}
