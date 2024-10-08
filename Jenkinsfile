pipeline {
    agent any

    environment {
        NVM_DIR = "/Users/sam/.nvm"
        NODE_VERSION = "22.9.0"
        APP_NAME = "nodejs-devops-pipeline"
        APP_VERSION = "1.0.0"
        DOCKER_IMAGE = "${APP_NAME}:${APP_VERSION}"
        PATH = "/usr/local/bin:${env.PATH}"
        DOCKER_CONFIG = "${WORKSPACE}/.docker"
    }

    stages {
        stage('Environment Setup') {
            steps {
                script {
                    sh """
                        echo "========== Environment Diagnostics =========="
                        echo "PATH: ${PATH}"
                        echo "Current user: \$(whoami)"
                        echo "Home directory: \$HOME"
                        echo "DOCKER_CONFIG: ${DOCKER_CONFIG}"
                        which docker || echo "Docker not found in PATH"
                        docker --version || echo "Docker CLI not working"
                        docker info || echo "Docker daemon not accessible"
                        
                        echo "========== Setting up Docker config =========="
                        mkdir -p ${DOCKER_CONFIG}
                        echo '{"credsStore":""}' > ${DOCKER_CONFIG}/config.json
                        cat ${DOCKER_CONFIG}/config.json
                        
                        echo "========== Node.js Setup =========="
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION} || nvm use node
                        node -v
                        npm -v
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh """
                    echo "========== Installing Dependencies =========="
                    export NVM_DIR="${NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION} || nvm use node
                    npm install
                """
            }
        }

        stage('Lint') {
            steps {
                sh """
                    echo "========== Running Linter =========="
                    export NVM_DIR="${NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION} || nvm use node
                    npm run lint || echo "Linting failed but continuing"
                """
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh """
                            echo "========== Running Tests =========="
                            export NVM_DIR="${NVM_DIR}"
                            [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                            nvm use ${NODE_VERSION} || nvm use node
                            npm test
                        """
                    } catch (Exception e) {
                        echo "Tests failed but continuing pipeline"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        echo "========== Building Docker Image =========="
                        docker build -t ${DOCKER_IMAGE} .
                    """
                }
            }
        }

        stage('Deploy to Test') {
            steps {
                script {
                    sh """
                        echo "========== Deploying to Test Environment =========="
                        docker stop ${APP_NAME}-test || true
                        docker rm ${APP_NAME}-test || true
                        docker run -d --name ${APP_NAME}-test -p 3000:3000 ${DOCKER_IMAGE}
                    """
                    echo "Application ${APP_NAME} version ${APP_VERSION} deployed to test environment: http://localhost:3000"
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    sh """
                        echo "========== Deploying to Production Environment =========="
                        docker stop ${APP_NAME}-prod || true
                        docker rm ${APP_NAME}-prod || true
                        docker run -d --name ${APP_NAME}-prod -p 3001:3000 ${DOCKER_IMAGE}
                    """
                    echo "Application ${APP_NAME} version ${APP_VERSION} deployed to production environment: http://localhost:3001"
                }
            }
        }
    }

    post {
        always {
            echo "========== Cleaning Workspace =========="
            cleanWs()
        }
        success {
            echo "========== Pipeline Succeeded =========="
        }
        unstable {
            echo "========== Pipeline Unstable =========="
        }
        failure {
            echo "========== Pipeline Failed =========="
        }
    }
}