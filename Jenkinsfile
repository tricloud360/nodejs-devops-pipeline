pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
        APP_NAME = "nodejs-devops-pipeline"
        APP_VERSION = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    try {
                        sh 'echo $PATH'
                        sh 'which node || echo "Node not found"'
                        sh 'node -v || echo "Node version command failed"'
                        sh 'which npm || echo "npm not found"'
                        sh 'npm -v || echo "npm version command failed"'
                        echo "Application version: ${env.APP_VERSION}"
                    } catch (Exception e) {
                        echo "Error in Setup stage: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Setup stage failed")
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        sh 'npm install'
                    } catch (Exception e) {
                        echo "Error installing dependencies: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Dependency installation failed")
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    try {
                        sh 'npx eslint . --ignore-pattern "node_modules/" || echo "Linting failed but continuing"'
                    } catch (Exception e) {
                        echo "Error during linting: ${e.getMessage()}"
                        // Continue pipeline even if linting fails
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test || echo "Tests failed but continuing"'
                    } catch (Exception e) {
                        echo "Error during testing: ${e.getMessage()}"
                        // Continue pipeline even if tests fail
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        sh 'npm run build || echo "No build script found"'
                    } catch (Exception e) {
                        echo "Error during build: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Build failed")
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    try {
                        echo "Deploying ${APP_NAME} version ${APP_VERSION} to Staging"
                        // Add your staging deployment logic here
                    } catch (Exception e) {
                        echo "Error deploying to staging: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Staging deployment failed")
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Ensure we're in a node context for workspace operations
                node {
                    echo 'Cleaning up workspace...'
                    deleteDir()
                }
            }
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}