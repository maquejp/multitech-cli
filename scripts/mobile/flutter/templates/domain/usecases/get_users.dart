import 'package:dartz/dartz.dart';
import '../entities/user.dart';
import '../repositories/user_repository.dart';
import '../../core/errors/failure.dart';
import '../../core/usecases/usecase.dart';

class GetUsers extends UseCase<List<User>, NoParams> {
  final UserRepository repository;
  GetUsers(this.repository);

  @override
  Future<Either<Failure, List<User>>> call(NoParams params) {
    return repository.getUsers();
  }
}

class NoParams {}