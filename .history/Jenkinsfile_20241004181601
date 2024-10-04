pipeline {
    agent any

    environment {
        NVM_DIR = "/Users/sam/.nvm"
        NODE_VERSION = "22.9.0"
        APP_NAME = "nodejs-devops-pipeline"
        APP_VERSION = "1.0.0"
        DOCKER_IMAGE = "nodejs-app:${APP_VERSION}"
    }

    stages {
        stage('Environment Setup') {
            steps {
                script {
                    sh """
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION} || nvm use node
                        node -v
                        npm -v
                    """
                }
            }
        }

        stage('Build') {
            steps {
                sh """
                    export NVM_DIR="${NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION} || nvm use node
                    npm ci
                    npm run build
                """
                // Create a Docker image as the build artifact
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Test') {
            steps {
                sh """
                    export NVM_DIR="${NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION} || nvm use node
                    npm test
                """
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    // Using ESLint for code quality analysis
                    sh """
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION} || nvm use node
                        npx eslint . --format checkstyle -o eslint-report.xml || true
                    """
                    recordIssues(tools: [esLint(pattern: 'eslint-report.xml')])
                }
            }
        }

        stage('Deploy to Test') {
            steps {
                script {
                    // Deploy to a local Docker container as a test environment
                    sh """
                        docker stop test-${APP_NAME} || true
                        docker rm test-${APP_NAME} || true
                        docker run -d --name test-${APP_NAME} -p 3000:3000 ${DOCKER_IMAGE}
                    """
                    echo "Application deployed to test environment: http://localhost:3000"
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    // Simulate releasing to production (replace with actual production deployment)
                    sh """
                        docker stop prod-${APP_NAME} || true
                        docker rm prod-${APP_NAME} || true
                        docker run -d --name prod-${APP_NAME} -p 3001:3000 ${DOCKER_IMAGE}
                    """
                    echo "Application released to production environment: http://localhost:3001"
                }
            }
        }

        stage('Monitoring and Alerting Setup') {
            steps {
                script {
                    // Simulate setting up monitoring (replace with actual monitoring setup)
                    echo "Setting up monitoring for the application..."
                    sh """
                        # Simulating monitoring setup
                        echo '{"monitoring": "enabled", "alerts": ["cpu_usage", "memory_usage", "error_rate"]}' > monitoring-config.json
                    """
                    echo "Monitoring and alerting configured. Check monitoring-config.json for details."
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}