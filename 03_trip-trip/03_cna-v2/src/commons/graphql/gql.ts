/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": typeof types.UploadFileDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.FetchUserLoggedInDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": typeof types.LogoutUserDocument,
    "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.FetchBoardDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        userPoint {\n          _id\n          amount\n        }\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.CreateBoardCommentDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.FetchBoardCommentsDocument,
    "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": typeof types.FetchBoardsCountDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.UpdateBoardCommentDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": typeof types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": typeof types.DislikeBoardDocument,
    "\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n    }\n  }\n": typeof types.FetchTravelproductsOfTheBestDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n      createdAt\n    }\n  }\n": typeof types.FetchTravelproductsDocument,
};
const documents: Documents = {
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        userPoint {\n          _id\n          amount\n        }\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n    }\n  }\n": types.FetchTravelproductsOfTheBestDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n      createdAt\n    }\n  }\n": types.FetchTravelproductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n        picture\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        userPoint {\n          _id\n          amount\n        }\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        userPoint {\n          _id\n          amount\n        }\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproductsOfTheBest {\n    fetchTravelproductsOfTheBest {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      contents\n      images\n      pickedCount\n      price\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      soldAt\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;