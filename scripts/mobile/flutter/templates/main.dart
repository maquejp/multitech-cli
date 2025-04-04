import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:dio/dio.dart';
import 'presentation/bloc/user_bloc.dart';
import 'data/repositories/user_repository_impl.dart';
import 'data/sources/remote/user_remote_source.dart';
import 'domain/usecases/get_users.dart';

void main() {
  final dio = Dio();
  final userRemoteSource = UserRemoteSourceImpl(dio: dio);
  final userRepository = UserRepositoryImpl(remoteSource: userRemoteSource);
  final getUsers = GetUsers(userRepository);

  runApp(MyApp(getUsers: getUsers));
}

class MyApp extends StatelessWidget {
  final GetUsers getUsers;

  const MyApp({super.key, required this.getUsers});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => UserBloc(getUsers: getUsers)..add(LoadUsers()),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: const Text("User List")),
          body: BlocBuilder<UserBloc, UserState>(
            builder: (context, state) {
              if (state is UserLoading) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is UserLoaded) {
                return ListView.builder(
                  itemCount: state.users.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(state.users[index].name),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Username: ${state.users[index].username}"),
                          Text("Email: ${state.users[index].email}"),
                          Text("Phone: ${state.users[index].phone}"),
                          Text("Website: ${state.users[index].website}"),
                        ],
                      ),
                    );
                  },
                );
              } else if (state is UserError) {
                return Center(
                    child: Text(state.message,
                        style: const TextStyle(color: Colors.red)));
              }
              return const Center(child: Text("No data available"));
            },
          ),
        ),
      ),
    );
  }
}
