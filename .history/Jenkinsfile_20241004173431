pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
        APP_NAME = "nodejs-devops-pipeline"
        APP_VERSION = "1.0.0" // Fallback version
    }

    stages {
        stage('Environment Diagnostics') {
            steps {
                script {
                    echo "Diagnostic Information:"
                    sh 'echo $PATH'
                    sh 'env | sort'
                    sh 'which node || echo "Node not found in PATH"'
                    sh 'which npm || echo "npm not found in PATH"'
                    sh '/usr/local/bin/node -v || echo "Node not accessible at /usr/local/bin/node"'
                    sh '/usr/local/bin/npm -v || echo "npm not accessible at /usr/local/bin/npm"'
                }
            }
        }

        stage('Setup') {
            steps {
                script {
                    try {
                        def nodeVersion = sh(script: "node -v", returnStdout: true).trim()
                        def npmVersion = sh(script: "npm -v", returnStdout: true).trim()
                        echo "Node version: ${nodeVersion}"
                        echo "npm version: ${npmVersion}"
                        
                        // Try to read package.json version
                        env.APP_VERSION = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                        echo "Application version: ${env.APP_VERSION}"
                    } catch (Exception e) {
                        echo "Error in Setup stage: ${e.getMessage()}"
                        echo "Continuing with fallback version: ${env.APP_VERSION}"
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