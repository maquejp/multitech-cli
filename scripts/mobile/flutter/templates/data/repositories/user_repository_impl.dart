import 'package:dartz/dartz.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/user_repository.dart';
import '../sources/remote/user_remote_source.dart';
import '../../core/errors/failure.dart';

class UserRepositoryImpl implements UserRepository {
  final UserRemoteSource remoteSource;

  UserRepositoryImpl({required this.remoteSource});

  @override
  Future<Either<Failure, List<User>>> getUsers() async {
    try {
      final users = await remoteSource.fetchUsers();
      return Right(users);
    } catch (e) {
      print("Repository Error: $e"); // Debugging log
      return const Left(ServerFailure("Failed to load users"));
    }
  }
}
