
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'coderwanda-webapp'
        CONTAINER_NAME = 'coderwanda-jenkins-container'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t coderwanda-webapp:%BUILD_NUMBER% .'
            }
        }

        stage('Deploy with Docker') {
            steps {
                bat 'docker rm -f coderwanda-jenkins-container || exit /b 0'

                bat 'docker run -d --name coderwanda-jenkins-container -p 3001:3000 coderwanda-webapp:%BUILD_NUMBER%'

                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Application deployed using Docker!'
        }

        failure {
            echo 'FAILED: Check Jenkins Console Output.'
        }
    }
}
