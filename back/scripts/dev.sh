TAG="mobile-back-dev"
LOCAL_IMAGE="back_backend"
ECR_REPOSITORY="045825870686.dkr.ecr.ap-northeast-2.amazonaws.com/elixir/menu"

ECR_IMAGE_TAG="$ECR_REPOSITORY:$TAG"

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_REPOSITORY
docker build -t $LOCAL_IMAGE .
docker tag $LOCAL_IMAGE $ECR_IMAGE_TAG
docker push $ECR_IMAGE_TAG
