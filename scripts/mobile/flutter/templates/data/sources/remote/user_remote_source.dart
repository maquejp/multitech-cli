import 'package:dio/dio.dart';
import '../../models/user_model.dart';

abstract class UserRemoteSource {
  Future<List<UserModel>> fetchUsers();
}

class UserRemoteSourceImpl implements UserRemoteSource {
  final Dio dio;

  UserRemoteSourceImpl({required this.dio});

  @override
  Future<List<UserModel>> fetchUsers() async {
    final response = await dio.get('https://jsonplaceholder.typicode.com/users');
    return (response.data as List).map((json) => UserModel.fromJson(json)).toList();
  }
}