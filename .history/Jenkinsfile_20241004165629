pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Setup') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'eslint -v'
                sh 'jest --version'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                sh 'eslint . --ignore-pattern "node_modules/"'
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production environment'
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
    }
}