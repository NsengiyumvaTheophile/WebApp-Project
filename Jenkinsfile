
pipeline {
    agent any

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
    }

    post {
        success {
            echo 'SUCCESS: Dependencies installed and tests passed!'
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output.'
        }
    }
}
