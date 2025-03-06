package usecases

import "student-planner/domain"

type UserUsecase struct {
	repo domain.UserRepository
}

func NewUserUsecase(repo domain.UserRepository) *UserUsecase {
	return &UserUsecase{
		repo: repo,
	}
}
func (usecase *UserUsecase) Login(email string, password string) (domain.UserModel, error) {
	return usecase.repo.Login(email, password)
}
func (usecase *UserUsecase) Register(name string, email string, password string) error {
	return usecase.repo.Register(name, email, password)
}
func (usecase *UserUsecase) GetUser(id int) (domain.UserModel, error) {
	return usecase.repo.GetUser(id)
}

func (usecase *UserUsecase) UpdateBadge(id int, badge string) error {
	return usecase.repo.UpdateBadge(id, badge)
}

func (usecase *UserUsecase) AskGemini(message string) (string, error) {
	return usecase.repo.AskGemini(message)
}
