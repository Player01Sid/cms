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
                        npm i
                        npm run build
                    }
                }
            }
        }
        stage('Docker build'){
            steps{
                echo "Building docker images"
                script{
                    dir('/home/jenkins/workspace/cms-pipeline/home'){
                        docker build . -t cms-home
                    }
                    dir('/home/jenkins/workspace/cms-pipeline/wordpress'){
                        docker build . -t cms-wordpress
                    }
                }
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying"
                //script{
                //    docker run -d -p 3000:3000 cms-home
                //    docker run -d -p 81:80 cms-wordpress
                //}
            }
        }
        
    }
}
