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
                sh '''
                    echo "Deploying to Staging Environment"
                    mkdir -p staging
                    cp -R * staging/ || true
                    echo "Application version $(node -p "require('./package.json').version") deployed to staging"
                '''
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
}pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        APP_NAME = "nodejs-devops-pipeline"
        APP_VERSION = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
    }

    stages {
        stage('Setup') {
            steps {
                echo "Setting up environment..."
                sh 'node -v'
                sh 'npm -v'
                sh 'eslint -v'
                sh 'jest --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo "Linting code..."
                sh 'eslint . --ignore-pattern "node_modules/"'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests with coverage..."
                sh 'npm run coverage'
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo "Performing security scan..."
                sh 'npm audit --audit-level=moderate'
            }
        }

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'npm run build'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to Staging Environment..."
                sh '''
                    mkdir -p staging
                    cp -R * staging/ || true
                    echo "Application ${APP_NAME} version ${APP_VERSION} deployed to staging"
                '''
            }
        }

        stage('Integration Tests') {
            steps {
                echo "Running integration tests..."
                sh 'npm run test:integration'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying to Production Environment..."
                sh '''
                    mkdir -p production
                    cp -R * production/ || true
                    echo "Application ${APP_NAME} version ${APP_VERSION} deployed to production"
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
        }
        success {
            echo 'Pipeline succeeded! Notifying team...'
            // Add notification logic here (e.g., Slack, email)
        }
        failure {
            echo 'Pipeline failed! Notifying team...'
            // Add notification logic here (e.g., Slack, email)
        }
    }
}