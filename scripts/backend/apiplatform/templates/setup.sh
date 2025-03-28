#!/bin/bash

if [ ! -d "/var/www/api/public" ]; then
    # Run Symfony project creation
    echo "Creating Symfony project"
    symfony new api --version=lts --webapp --no-interaction --no-git
    cd /var/www/api/
    echo "Installing API Platform"
    symfony composer req api
    echo "Creating HelloWordController"
    symfony console make:controller --with-tests  HelloWordController
    symfony console make:controller --with-tests  HelloWordApiController

    # Modify the controller to return JSON response with project name
    cat <<EOL > ./src/Controller/HelloWorldApiController.php
<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HelloWorldApiController extends AbstractController
{
    #[Route('/hello-api', name: 'api_hello_world', methods: ['GET'])]
    public function index(): JsonResponse
    {
        \$projectName = getenv('PROJECT_NAME') ?: 'my-api-platform';
        return \$this->json(['message' => "Welcome to \${projectName} API Platform!"]);
    }
}
EOL

else
    echo "Symfony project already exists"
fi

# Start Supervisor to manage processes
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
