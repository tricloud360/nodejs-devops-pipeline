pipeline {
    agent any

    stages {
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
                sh 'npm run lint' // We'll need to add this script to package.json
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment' // We'll implement this later
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production environment' // We'll implement this later
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