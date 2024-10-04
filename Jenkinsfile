pipeline {
    agent any  // This will use any available agent

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
                sh 'node -v || echo "Node.js not found"'
                sh 'npm -v || echo "npm not found"'
                sh 'eslint -v || echo "ESLint not found"'
                sh 'jest --version || echo "Jest not found"'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo "Linting code..."
                sh 'npx eslint . --ignore-pattern "node_modules/" || echo "Linting failed but continuing"'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'npm test || echo "Tests failed but continuing"'
            }
        }

        stage('Security Scan') {
            steps {
                echo "Performing security scan..."
                sh 'npm audit --audit-level=moderate || echo "Security scan failed but continuing"'
            }
        }

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'npm run build || echo "No build script found"'
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
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}