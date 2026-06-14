
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Colectivo
 * 
 */
export type Colectivo = $Result.DefaultSelection<Prisma.$ColectivoPayload>
/**
 * Model Tarea
 * 
 */
export type Tarea = $Result.DefaultSelection<Prisma.$TareaPayload>
/**
 * Model ColectivoProfesor
 * 
 */
export type ColectivoProfesor = $Result.DefaultSelection<Prisma.$ColectivoProfesorPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Rol: {
  ADMIN: 'Administrador',
  DECANO_VICEDECANO: 'Decano-Vice Decano',
  JEFE_DEPARTAMENTO: 'Jefe de Departamento',
  PPA: 'PPA',
  PROFESOR: 'Profesor',
  NUEVO_USUARIO: 'Nuevo Usuario'
};

export type Rol = (typeof Rol)[keyof typeof Rol]


export const Modalidad: {
  DIURNO: 'DIURNO',
  ENCUENTRO: 'ENCUENTRO'
};

export type Modalidad = (typeof Modalidad)[keyof typeof Modalidad]


export const estadoTarea: {
  COMPLETADA: 'COMPLETADA',
  RECHAZADA: 'RECHAZADA',
  EN_REVIsION: 'EN_REVIsION',
  PENDIENTE: 'PENDIENTE'
};

export type estadoTarea = (typeof estadoTarea)[keyof typeof estadoTarea]

}

export type Rol = $Enums.Rol

export const Rol: typeof $Enums.Rol

export type Modalidad = $Enums.Modalidad

export const Modalidad: typeof $Enums.Modalidad

export type estadoTarea = $Enums.estadoTarea

export const estadoTarea: typeof $Enums.estadoTarea

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.colectivo`: Exposes CRUD operations for the **Colectivo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colectivos
    * const colectivos = await prisma.colectivo.findMany()
    * ```
    */
  get colectivo(): Prisma.ColectivoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tarea`: Exposes CRUD operations for the **Tarea** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tareas
    * const tareas = await prisma.tarea.findMany()
    * ```
    */
  get tarea(): Prisma.TareaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.colectivoProfesor`: Exposes CRUD operations for the **ColectivoProfesor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ColectivoProfesors
    * const colectivoProfesors = await prisma.colectivoProfesor.findMany()
    * ```
    */
  get colectivoProfesor(): Prisma.ColectivoProfesorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Colectivo: 'Colectivo',
    Tarea: 'Tarea',
    ColectivoProfesor: 'ColectivoProfesor'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "colectivo" | "tarea" | "colectivoProfesor"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Colectivo: {
        payload: Prisma.$ColectivoPayload<ExtArgs>
        fields: Prisma.ColectivoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColectivoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColectivoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          findFirst: {
            args: Prisma.ColectivoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColectivoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          findMany: {
            args: Prisma.ColectivoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>[]
          }
          create: {
            args: Prisma.ColectivoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          createMany: {
            args: Prisma.ColectivoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColectivoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>[]
          }
          delete: {
            args: Prisma.ColectivoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          update: {
            args: Prisma.ColectivoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          deleteMany: {
            args: Prisma.ColectivoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColectivoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColectivoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>[]
          }
          upsert: {
            args: Prisma.ColectivoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoPayload>
          }
          aggregate: {
            args: Prisma.ColectivoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColectivo>
          }
          groupBy: {
            args: Prisma.ColectivoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColectivoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColectivoCountArgs<ExtArgs>
            result: $Utils.Optional<ColectivoCountAggregateOutputType> | number
          }
        }
      }
      Tarea: {
        payload: Prisma.$TareaPayload<ExtArgs>
        fields: Prisma.TareaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TareaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TareaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          findFirst: {
            args: Prisma.TareaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TareaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          findMany: {
            args: Prisma.TareaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          create: {
            args: Prisma.TareaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          createMany: {
            args: Prisma.TareaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TareaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          delete: {
            args: Prisma.TareaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          update: {
            args: Prisma.TareaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          deleteMany: {
            args: Prisma.TareaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TareaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TareaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>[]
          }
          upsert: {
            args: Prisma.TareaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TareaPayload>
          }
          aggregate: {
            args: Prisma.TareaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarea>
          }
          groupBy: {
            args: Prisma.TareaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TareaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TareaCountArgs<ExtArgs>
            result: $Utils.Optional<TareaCountAggregateOutputType> | number
          }
        }
      }
      ColectivoProfesor: {
        payload: Prisma.$ColectivoProfesorPayload<ExtArgs>
        fields: Prisma.ColectivoProfesorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColectivoProfesorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColectivoProfesorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          findFirst: {
            args: Prisma.ColectivoProfesorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColectivoProfesorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          findMany: {
            args: Prisma.ColectivoProfesorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>[]
          }
          create: {
            args: Prisma.ColectivoProfesorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          createMany: {
            args: Prisma.ColectivoProfesorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColectivoProfesorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>[]
          }
          delete: {
            args: Prisma.ColectivoProfesorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          update: {
            args: Prisma.ColectivoProfesorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          deleteMany: {
            args: Prisma.ColectivoProfesorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColectivoProfesorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColectivoProfesorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>[]
          }
          upsert: {
            args: Prisma.ColectivoProfesorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColectivoProfesorPayload>
          }
          aggregate: {
            args: Prisma.ColectivoProfesorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColectivoProfesor>
          }
          groupBy: {
            args: Prisma.ColectivoProfesorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColectivoProfesorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColectivoProfesorCountArgs<ExtArgs>
            result: $Utils.Optional<ColectivoProfesorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    colectivo?: ColectivoOmit
    tarea?: TareaOmit
    colectivoProfesor?: ColectivoProfesorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    colectivos: number
    tareas: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colectivos?: boolean | UserCountOutputTypeCountColectivosArgs
    tareas?: boolean | UserCountOutputTypeCountTareasArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountColectivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColectivoProfesorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaWhereInput
  }


  /**
   * Count Type ColectivoCountOutputType
   */

  export type ColectivoCountOutputType = {
    profesores: number
  }

  export type ColectivoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profesores?: boolean | ColectivoCountOutputTypeCountProfesoresArgs
  }

  // Custom InputTypes
  /**
   * ColectivoCountOutputType without action
   */
  export type ColectivoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoCountOutputType
     */
    select?: ColectivoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColectivoCountOutputType without action
   */
  export type ColectivoCountOutputTypeCountProfesoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColectivoProfesorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    userId: string | null
    userName: string | null
    password: string | null
    rol: $Enums.Rol | null
    apellido: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    userName: string | null
    password: string | null
    rol: $Enums.Rol | null
    apellido: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    userName: number
    password: number
    rol: number
    apellido: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    userId?: true
    userName?: true
    password?: true
    rol?: true
    apellido?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    userName?: true
    password?: true
    rol?: true
    apellido?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    userName?: true
    password?: true
    rol?: true
    apellido?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: string
    userName: string
    password: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userName?: boolean
    password?: boolean
    rol?: boolean
    apellido?: boolean
    createdAt?: boolean
    colectivos?: boolean | User$colectivosArgs<ExtArgs>
    tareas?: boolean | User$tareasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userName?: boolean
    password?: boolean
    rol?: boolean
    apellido?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    userName?: boolean
    password?: boolean
    rol?: boolean
    apellido?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    userName?: boolean
    password?: boolean
    rol?: boolean
    apellido?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "userName" | "password" | "rol" | "apellido" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colectivos?: boolean | User$colectivosArgs<ExtArgs>
    tareas?: boolean | User$tareasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      colectivos: Prisma.$ColectivoProfesorPayload<ExtArgs>[]
      tareas: Prisma.$TareaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      userName: string
      password: string | null
      rol: $Enums.Rol
      apellido: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    colectivos<T extends User$colectivosArgs<ExtArgs> = {}>(args?: Subset<T, User$colectivosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tareas<T extends User$tareasArgs<ExtArgs> = {}>(args?: Subset<T, User$tareasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'String'>
    readonly userName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly rol: FieldRef<"User", 'Rol'>
    readonly apellido: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.colectivos
   */
  export type User$colectivosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    where?: ColectivoProfesorWhereInput
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    cursor?: ColectivoProfesorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColectivoProfesorScalarFieldEnum | ColectivoProfesorScalarFieldEnum[]
  }

  /**
   * User.tareas
   */
  export type User$tareasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    where?: TareaWhereInput
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    cursor?: TareaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Colectivo
   */

  export type AggregateColectivo = {
    _count: ColectivoCountAggregateOutputType | null
    _avg: ColectivoAvgAggregateOutputType | null
    _sum: ColectivoSumAggregateOutputType | null
    _min: ColectivoMinAggregateOutputType | null
    _max: ColectivoMaxAggregateOutputType | null
  }

  export type ColectivoAvgAggregateOutputType = {
    year: number | null
  }

  export type ColectivoSumAggregateOutputType = {
    year: number | null
  }

  export type ColectivoMinAggregateOutputType = {
    colectivoId: string | null
    nombreColectivo: string | null
    year: number | null
    modalidad: $Enums.Modalidad | null
    createdAt: Date | null
  }

  export type ColectivoMaxAggregateOutputType = {
    colectivoId: string | null
    nombreColectivo: string | null
    year: number | null
    modalidad: $Enums.Modalidad | null
    createdAt: Date | null
  }

  export type ColectivoCountAggregateOutputType = {
    colectivoId: number
    nombreColectivo: number
    year: number
    modalidad: number
    createdAt: number
    _all: number
  }


  export type ColectivoAvgAggregateInputType = {
    year?: true
  }

  export type ColectivoSumAggregateInputType = {
    year?: true
  }

  export type ColectivoMinAggregateInputType = {
    colectivoId?: true
    nombreColectivo?: true
    year?: true
    modalidad?: true
    createdAt?: true
  }

  export type ColectivoMaxAggregateInputType = {
    colectivoId?: true
    nombreColectivo?: true
    year?: true
    modalidad?: true
    createdAt?: true
  }

  export type ColectivoCountAggregateInputType = {
    colectivoId?: true
    nombreColectivo?: true
    year?: true
    modalidad?: true
    createdAt?: true
    _all?: true
  }

  export type ColectivoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colectivo to aggregate.
     */
    where?: ColectivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colectivos to fetch.
     */
    orderBy?: ColectivoOrderByWithRelationInput | ColectivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColectivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colectivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colectivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colectivos
    **/
    _count?: true | ColectivoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColectivoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColectivoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColectivoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColectivoMaxAggregateInputType
  }

  export type GetColectivoAggregateType<T extends ColectivoAggregateArgs> = {
        [P in keyof T & keyof AggregateColectivo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColectivo[P]>
      : GetScalarType<T[P], AggregateColectivo[P]>
  }




  export type ColectivoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColectivoWhereInput
    orderBy?: ColectivoOrderByWithAggregationInput | ColectivoOrderByWithAggregationInput[]
    by: ColectivoScalarFieldEnum[] | ColectivoScalarFieldEnum
    having?: ColectivoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColectivoCountAggregateInputType | true
    _avg?: ColectivoAvgAggregateInputType
    _sum?: ColectivoSumAggregateInputType
    _min?: ColectivoMinAggregateInputType
    _max?: ColectivoMaxAggregateInputType
  }

  export type ColectivoGroupByOutputType = {
    colectivoId: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt: Date
    _count: ColectivoCountAggregateOutputType | null
    _avg: ColectivoAvgAggregateOutputType | null
    _sum: ColectivoSumAggregateOutputType | null
    _min: ColectivoMinAggregateOutputType | null
    _max: ColectivoMaxAggregateOutputType | null
  }

  type GetColectivoGroupByPayload<T extends ColectivoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColectivoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColectivoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColectivoGroupByOutputType[P]>
            : GetScalarType<T[P], ColectivoGroupByOutputType[P]>
        }
      >
    >


  export type ColectivoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    nombreColectivo?: boolean
    year?: boolean
    modalidad?: boolean
    createdAt?: boolean
    profesores?: boolean | Colectivo$profesoresArgs<ExtArgs>
    _count?: boolean | ColectivoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colectivo"]>

  export type ColectivoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    nombreColectivo?: boolean
    year?: boolean
    modalidad?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["colectivo"]>

  export type ColectivoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    nombreColectivo?: boolean
    year?: boolean
    modalidad?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["colectivo"]>

  export type ColectivoSelectScalar = {
    colectivoId?: boolean
    nombreColectivo?: boolean
    year?: boolean
    modalidad?: boolean
    createdAt?: boolean
  }

  export type ColectivoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"colectivoId" | "nombreColectivo" | "year" | "modalidad" | "createdAt", ExtArgs["result"]["colectivo"]>
  export type ColectivoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profesores?: boolean | Colectivo$profesoresArgs<ExtArgs>
    _count?: boolean | ColectivoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColectivoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ColectivoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ColectivoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Colectivo"
    objects: {
      profesores: Prisma.$ColectivoProfesorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      colectivoId: string
      nombreColectivo: string
      year: number
      modalidad: $Enums.Modalidad
      createdAt: Date
    }, ExtArgs["result"]["colectivo"]>
    composites: {}
  }

  type ColectivoGetPayload<S extends boolean | null | undefined | ColectivoDefaultArgs> = $Result.GetResult<Prisma.$ColectivoPayload, S>

  type ColectivoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColectivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColectivoCountAggregateInputType | true
    }

  export interface ColectivoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Colectivo'], meta: { name: 'Colectivo' } }
    /**
     * Find zero or one Colectivo that matches the filter.
     * @param {ColectivoFindUniqueArgs} args - Arguments to find a Colectivo
     * @example
     * // Get one Colectivo
     * const colectivo = await prisma.colectivo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColectivoFindUniqueArgs>(args: SelectSubset<T, ColectivoFindUniqueArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Colectivo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColectivoFindUniqueOrThrowArgs} args - Arguments to find a Colectivo
     * @example
     * // Get one Colectivo
     * const colectivo = await prisma.colectivo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColectivoFindUniqueOrThrowArgs>(args: SelectSubset<T, ColectivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colectivo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoFindFirstArgs} args - Arguments to find a Colectivo
     * @example
     * // Get one Colectivo
     * const colectivo = await prisma.colectivo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColectivoFindFirstArgs>(args?: SelectSubset<T, ColectivoFindFirstArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colectivo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoFindFirstOrThrowArgs} args - Arguments to find a Colectivo
     * @example
     * // Get one Colectivo
     * const colectivo = await prisma.colectivo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColectivoFindFirstOrThrowArgs>(args?: SelectSubset<T, ColectivoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Colectivos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colectivos
     * const colectivos = await prisma.colectivo.findMany()
     * 
     * // Get first 10 Colectivos
     * const colectivos = await prisma.colectivo.findMany({ take: 10 })
     * 
     * // Only select the `colectivoId`
     * const colectivoWithColectivoIdOnly = await prisma.colectivo.findMany({ select: { colectivoId: true } })
     * 
     */
    findMany<T extends ColectivoFindManyArgs>(args?: SelectSubset<T, ColectivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Colectivo.
     * @param {ColectivoCreateArgs} args - Arguments to create a Colectivo.
     * @example
     * // Create one Colectivo
     * const Colectivo = await prisma.colectivo.create({
     *   data: {
     *     // ... data to create a Colectivo
     *   }
     * })
     * 
     */
    create<T extends ColectivoCreateArgs>(args: SelectSubset<T, ColectivoCreateArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Colectivos.
     * @param {ColectivoCreateManyArgs} args - Arguments to create many Colectivos.
     * @example
     * // Create many Colectivos
     * const colectivo = await prisma.colectivo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColectivoCreateManyArgs>(args?: SelectSubset<T, ColectivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colectivos and returns the data saved in the database.
     * @param {ColectivoCreateManyAndReturnArgs} args - Arguments to create many Colectivos.
     * @example
     * // Create many Colectivos
     * const colectivo = await prisma.colectivo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colectivos and only return the `colectivoId`
     * const colectivoWithColectivoIdOnly = await prisma.colectivo.createManyAndReturn({
     *   select: { colectivoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColectivoCreateManyAndReturnArgs>(args?: SelectSubset<T, ColectivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Colectivo.
     * @param {ColectivoDeleteArgs} args - Arguments to delete one Colectivo.
     * @example
     * // Delete one Colectivo
     * const Colectivo = await prisma.colectivo.delete({
     *   where: {
     *     // ... filter to delete one Colectivo
     *   }
     * })
     * 
     */
    delete<T extends ColectivoDeleteArgs>(args: SelectSubset<T, ColectivoDeleteArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Colectivo.
     * @param {ColectivoUpdateArgs} args - Arguments to update one Colectivo.
     * @example
     * // Update one Colectivo
     * const colectivo = await prisma.colectivo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColectivoUpdateArgs>(args: SelectSubset<T, ColectivoUpdateArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Colectivos.
     * @param {ColectivoDeleteManyArgs} args - Arguments to filter Colectivos to delete.
     * @example
     * // Delete a few Colectivos
     * const { count } = await prisma.colectivo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColectivoDeleteManyArgs>(args?: SelectSubset<T, ColectivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colectivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colectivos
     * const colectivo = await prisma.colectivo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColectivoUpdateManyArgs>(args: SelectSubset<T, ColectivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colectivos and returns the data updated in the database.
     * @param {ColectivoUpdateManyAndReturnArgs} args - Arguments to update many Colectivos.
     * @example
     * // Update many Colectivos
     * const colectivo = await prisma.colectivo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colectivos and only return the `colectivoId`
     * const colectivoWithColectivoIdOnly = await prisma.colectivo.updateManyAndReturn({
     *   select: { colectivoId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColectivoUpdateManyAndReturnArgs>(args: SelectSubset<T, ColectivoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Colectivo.
     * @param {ColectivoUpsertArgs} args - Arguments to update or create a Colectivo.
     * @example
     * // Update or create a Colectivo
     * const colectivo = await prisma.colectivo.upsert({
     *   create: {
     *     // ... data to create a Colectivo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Colectivo we want to update
     *   }
     * })
     */
    upsert<T extends ColectivoUpsertArgs>(args: SelectSubset<T, ColectivoUpsertArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Colectivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoCountArgs} args - Arguments to filter Colectivos to count.
     * @example
     * // Count the number of Colectivos
     * const count = await prisma.colectivo.count({
     *   where: {
     *     // ... the filter for the Colectivos we want to count
     *   }
     * })
    **/
    count<T extends ColectivoCountArgs>(
      args?: Subset<T, ColectivoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColectivoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Colectivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColectivoAggregateArgs>(args: Subset<T, ColectivoAggregateArgs>): Prisma.PrismaPromise<GetColectivoAggregateType<T>>

    /**
     * Group by Colectivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColectivoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColectivoGroupByArgs['orderBy'] }
        : { orderBy?: ColectivoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColectivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColectivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Colectivo model
   */
  readonly fields: ColectivoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Colectivo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColectivoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profesores<T extends Colectivo$profesoresArgs<ExtArgs> = {}>(args?: Subset<T, Colectivo$profesoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Colectivo model
   */
  interface ColectivoFieldRefs {
    readonly colectivoId: FieldRef<"Colectivo", 'String'>
    readonly nombreColectivo: FieldRef<"Colectivo", 'String'>
    readonly year: FieldRef<"Colectivo", 'Int'>
    readonly modalidad: FieldRef<"Colectivo", 'Modalidad'>
    readonly createdAt: FieldRef<"Colectivo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Colectivo findUnique
   */
  export type ColectivoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter, which Colectivo to fetch.
     */
    where: ColectivoWhereUniqueInput
  }

  /**
   * Colectivo findUniqueOrThrow
   */
  export type ColectivoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter, which Colectivo to fetch.
     */
    where: ColectivoWhereUniqueInput
  }

  /**
   * Colectivo findFirst
   */
  export type ColectivoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter, which Colectivo to fetch.
     */
    where?: ColectivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colectivos to fetch.
     */
    orderBy?: ColectivoOrderByWithRelationInput | ColectivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colectivos.
     */
    cursor?: ColectivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colectivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colectivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colectivos.
     */
    distinct?: ColectivoScalarFieldEnum | ColectivoScalarFieldEnum[]
  }

  /**
   * Colectivo findFirstOrThrow
   */
  export type ColectivoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter, which Colectivo to fetch.
     */
    where?: ColectivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colectivos to fetch.
     */
    orderBy?: ColectivoOrderByWithRelationInput | ColectivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colectivos.
     */
    cursor?: ColectivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colectivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colectivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colectivos.
     */
    distinct?: ColectivoScalarFieldEnum | ColectivoScalarFieldEnum[]
  }

  /**
   * Colectivo findMany
   */
  export type ColectivoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter, which Colectivos to fetch.
     */
    where?: ColectivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colectivos to fetch.
     */
    orderBy?: ColectivoOrderByWithRelationInput | ColectivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colectivos.
     */
    cursor?: ColectivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colectivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colectivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colectivos.
     */
    distinct?: ColectivoScalarFieldEnum | ColectivoScalarFieldEnum[]
  }

  /**
   * Colectivo create
   */
  export type ColectivoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * The data needed to create a Colectivo.
     */
    data: XOR<ColectivoCreateInput, ColectivoUncheckedCreateInput>
  }

  /**
   * Colectivo createMany
   */
  export type ColectivoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colectivos.
     */
    data: ColectivoCreateManyInput | ColectivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Colectivo createManyAndReturn
   */
  export type ColectivoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * The data used to create many Colectivos.
     */
    data: ColectivoCreateManyInput | ColectivoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Colectivo update
   */
  export type ColectivoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * The data needed to update a Colectivo.
     */
    data: XOR<ColectivoUpdateInput, ColectivoUncheckedUpdateInput>
    /**
     * Choose, which Colectivo to update.
     */
    where: ColectivoWhereUniqueInput
  }

  /**
   * Colectivo updateMany
   */
  export type ColectivoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colectivos.
     */
    data: XOR<ColectivoUpdateManyMutationInput, ColectivoUncheckedUpdateManyInput>
    /**
     * Filter which Colectivos to update
     */
    where?: ColectivoWhereInput
    /**
     * Limit how many Colectivos to update.
     */
    limit?: number
  }

  /**
   * Colectivo updateManyAndReturn
   */
  export type ColectivoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * The data used to update Colectivos.
     */
    data: XOR<ColectivoUpdateManyMutationInput, ColectivoUncheckedUpdateManyInput>
    /**
     * Filter which Colectivos to update
     */
    where?: ColectivoWhereInput
    /**
     * Limit how many Colectivos to update.
     */
    limit?: number
  }

  /**
   * Colectivo upsert
   */
  export type ColectivoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * The filter to search for the Colectivo to update in case it exists.
     */
    where: ColectivoWhereUniqueInput
    /**
     * In case the Colectivo found by the `where` argument doesn't exist, create a new Colectivo with this data.
     */
    create: XOR<ColectivoCreateInput, ColectivoUncheckedCreateInput>
    /**
     * In case the Colectivo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColectivoUpdateInput, ColectivoUncheckedUpdateInput>
  }

  /**
   * Colectivo delete
   */
  export type ColectivoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
    /**
     * Filter which Colectivo to delete.
     */
    where: ColectivoWhereUniqueInput
  }

  /**
   * Colectivo deleteMany
   */
  export type ColectivoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colectivos to delete
     */
    where?: ColectivoWhereInput
    /**
     * Limit how many Colectivos to delete.
     */
    limit?: number
  }

  /**
   * Colectivo.profesores
   */
  export type Colectivo$profesoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    where?: ColectivoProfesorWhereInput
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    cursor?: ColectivoProfesorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColectivoProfesorScalarFieldEnum | ColectivoProfesorScalarFieldEnum[]
  }

  /**
   * Colectivo without action
   */
  export type ColectivoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colectivo
     */
    select?: ColectivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colectivo
     */
    omit?: ColectivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoInclude<ExtArgs> | null
  }


  /**
   * Model Tarea
   */

  export type AggregateTarea = {
    _count: TareaCountAggregateOutputType | null
    _min: TareaMinAggregateOutputType | null
    _max: TareaMaxAggregateOutputType | null
  }

  export type TareaMinAggregateOutputType = {
    tareaId: string | null
    nombreTarea: string | null
    descripcion: string | null
    fechaLimite: Date | null
    estado: $Enums.estadoTarea | null
    userId: string | null
  }

  export type TareaMaxAggregateOutputType = {
    tareaId: string | null
    nombreTarea: string | null
    descripcion: string | null
    fechaLimite: Date | null
    estado: $Enums.estadoTarea | null
    userId: string | null
  }

  export type TareaCountAggregateOutputType = {
    tareaId: number
    nombreTarea: number
    descripcion: number
    fechaLimite: number
    estado: number
    userId: number
    _all: number
  }


  export type TareaMinAggregateInputType = {
    tareaId?: true
    nombreTarea?: true
    descripcion?: true
    fechaLimite?: true
    estado?: true
    userId?: true
  }

  export type TareaMaxAggregateInputType = {
    tareaId?: true
    nombreTarea?: true
    descripcion?: true
    fechaLimite?: true
    estado?: true
    userId?: true
  }

  export type TareaCountAggregateInputType = {
    tareaId?: true
    nombreTarea?: true
    descripcion?: true
    fechaLimite?: true
    estado?: true
    userId?: true
    _all?: true
  }

  export type TareaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tarea to aggregate.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tareas
    **/
    _count?: true | TareaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TareaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TareaMaxAggregateInputType
  }

  export type GetTareaAggregateType<T extends TareaAggregateArgs> = {
        [P in keyof T & keyof AggregateTarea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarea[P]>
      : GetScalarType<T[P], AggregateTarea[P]>
  }




  export type TareaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TareaWhereInput
    orderBy?: TareaOrderByWithAggregationInput | TareaOrderByWithAggregationInput[]
    by: TareaScalarFieldEnum[] | TareaScalarFieldEnum
    having?: TareaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TareaCountAggregateInputType | true
    _min?: TareaMinAggregateInputType
    _max?: TareaMaxAggregateInputType
  }

  export type TareaGroupByOutputType = {
    tareaId: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date
    estado: $Enums.estadoTarea
    userId: string
    _count: TareaCountAggregateOutputType | null
    _min: TareaMinAggregateOutputType | null
    _max: TareaMaxAggregateOutputType | null
  }

  type GetTareaGroupByPayload<T extends TareaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TareaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TareaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TareaGroupByOutputType[P]>
            : GetScalarType<T[P], TareaGroupByOutputType[P]>
        }
      >
    >


  export type TareaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    nombreTarea?: boolean
    descripcion?: boolean
    fechaLimite?: boolean
    estado?: boolean
    userId?: boolean
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    nombreTarea?: boolean
    descripcion?: boolean
    fechaLimite?: boolean
    estado?: boolean
    userId?: boolean
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tareaId?: boolean
    nombreTarea?: boolean
    descripcion?: boolean
    fechaLimite?: boolean
    estado?: boolean
    userId?: boolean
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tarea"]>

  export type TareaSelectScalar = {
    tareaId?: boolean
    nombreTarea?: boolean
    descripcion?: boolean
    fechaLimite?: boolean
    estado?: boolean
    userId?: boolean
  }

  export type TareaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tareaId" | "nombreTarea" | "descripcion" | "fechaLimite" | "estado" | "userId", ExtArgs["result"]["tarea"]>
  export type TareaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TareaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TareaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TareaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tarea"
    objects: {
      profesor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      tareaId: string
      nombreTarea: string
      descripcion: string
      fechaLimite: Date
      estado: $Enums.estadoTarea
      userId: string
    }, ExtArgs["result"]["tarea"]>
    composites: {}
  }

  type TareaGetPayload<S extends boolean | null | undefined | TareaDefaultArgs> = $Result.GetResult<Prisma.$TareaPayload, S>

  type TareaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TareaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TareaCountAggregateInputType | true
    }

  export interface TareaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tarea'], meta: { name: 'Tarea' } }
    /**
     * Find zero or one Tarea that matches the filter.
     * @param {TareaFindUniqueArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TareaFindUniqueArgs>(args: SelectSubset<T, TareaFindUniqueArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tarea that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TareaFindUniqueOrThrowArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TareaFindUniqueOrThrowArgs>(args: SelectSubset<T, TareaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarea that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindFirstArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TareaFindFirstArgs>(args?: SelectSubset<T, TareaFindFirstArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tarea that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindFirstOrThrowArgs} args - Arguments to find a Tarea
     * @example
     * // Get one Tarea
     * const tarea = await prisma.tarea.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TareaFindFirstOrThrowArgs>(args?: SelectSubset<T, TareaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tareas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tareas
     * const tareas = await prisma.tarea.findMany()
     * 
     * // Get first 10 Tareas
     * const tareas = await prisma.tarea.findMany({ take: 10 })
     * 
     * // Only select the `tareaId`
     * const tareaWithTareaIdOnly = await prisma.tarea.findMany({ select: { tareaId: true } })
     * 
     */
    findMany<T extends TareaFindManyArgs>(args?: SelectSubset<T, TareaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tarea.
     * @param {TareaCreateArgs} args - Arguments to create a Tarea.
     * @example
     * // Create one Tarea
     * const Tarea = await prisma.tarea.create({
     *   data: {
     *     // ... data to create a Tarea
     *   }
     * })
     * 
     */
    create<T extends TareaCreateArgs>(args: SelectSubset<T, TareaCreateArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tareas.
     * @param {TareaCreateManyArgs} args - Arguments to create many Tareas.
     * @example
     * // Create many Tareas
     * const tarea = await prisma.tarea.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TareaCreateManyArgs>(args?: SelectSubset<T, TareaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tareas and returns the data saved in the database.
     * @param {TareaCreateManyAndReturnArgs} args - Arguments to create many Tareas.
     * @example
     * // Create many Tareas
     * const tarea = await prisma.tarea.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tareas and only return the `tareaId`
     * const tareaWithTareaIdOnly = await prisma.tarea.createManyAndReturn({
     *   select: { tareaId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TareaCreateManyAndReturnArgs>(args?: SelectSubset<T, TareaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tarea.
     * @param {TareaDeleteArgs} args - Arguments to delete one Tarea.
     * @example
     * // Delete one Tarea
     * const Tarea = await prisma.tarea.delete({
     *   where: {
     *     // ... filter to delete one Tarea
     *   }
     * })
     * 
     */
    delete<T extends TareaDeleteArgs>(args: SelectSubset<T, TareaDeleteArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tarea.
     * @param {TareaUpdateArgs} args - Arguments to update one Tarea.
     * @example
     * // Update one Tarea
     * const tarea = await prisma.tarea.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TareaUpdateArgs>(args: SelectSubset<T, TareaUpdateArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tareas.
     * @param {TareaDeleteManyArgs} args - Arguments to filter Tareas to delete.
     * @example
     * // Delete a few Tareas
     * const { count } = await prisma.tarea.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TareaDeleteManyArgs>(args?: SelectSubset<T, TareaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tareas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tareas
     * const tarea = await prisma.tarea.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TareaUpdateManyArgs>(args: SelectSubset<T, TareaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tareas and returns the data updated in the database.
     * @param {TareaUpdateManyAndReturnArgs} args - Arguments to update many Tareas.
     * @example
     * // Update many Tareas
     * const tarea = await prisma.tarea.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tareas and only return the `tareaId`
     * const tareaWithTareaIdOnly = await prisma.tarea.updateManyAndReturn({
     *   select: { tareaId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TareaUpdateManyAndReturnArgs>(args: SelectSubset<T, TareaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tarea.
     * @param {TareaUpsertArgs} args - Arguments to update or create a Tarea.
     * @example
     * // Update or create a Tarea
     * const tarea = await prisma.tarea.upsert({
     *   create: {
     *     // ... data to create a Tarea
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tarea we want to update
     *   }
     * })
     */
    upsert<T extends TareaUpsertArgs>(args: SelectSubset<T, TareaUpsertArgs<ExtArgs>>): Prisma__TareaClient<$Result.GetResult<Prisma.$TareaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tareas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaCountArgs} args - Arguments to filter Tareas to count.
     * @example
     * // Count the number of Tareas
     * const count = await prisma.tarea.count({
     *   where: {
     *     // ... the filter for the Tareas we want to count
     *   }
     * })
    **/
    count<T extends TareaCountArgs>(
      args?: Subset<T, TareaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TareaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tarea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TareaAggregateArgs>(args: Subset<T, TareaAggregateArgs>): Prisma.PrismaPromise<GetTareaAggregateType<T>>

    /**
     * Group by Tarea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TareaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TareaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TareaGroupByArgs['orderBy'] }
        : { orderBy?: TareaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TareaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTareaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tarea model
   */
  readonly fields: TareaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tarea.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TareaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profesor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tarea model
   */
  interface TareaFieldRefs {
    readonly tareaId: FieldRef<"Tarea", 'String'>
    readonly nombreTarea: FieldRef<"Tarea", 'String'>
    readonly descripcion: FieldRef<"Tarea", 'String'>
    readonly fechaLimite: FieldRef<"Tarea", 'DateTime'>
    readonly estado: FieldRef<"Tarea", 'estadoTarea'>
    readonly userId: FieldRef<"Tarea", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tarea findUnique
   */
  export type TareaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea findUniqueOrThrow
   */
  export type TareaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea findFirst
   */
  export type TareaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tareas.
     */
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea findFirstOrThrow
   */
  export type TareaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tarea to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tareas.
     */
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea findMany
   */
  export type TareaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter, which Tareas to fetch.
     */
    where?: TareaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tareas to fetch.
     */
    orderBy?: TareaOrderByWithRelationInput | TareaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tareas.
     */
    cursor?: TareaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tareas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tareas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tareas.
     */
    distinct?: TareaScalarFieldEnum | TareaScalarFieldEnum[]
  }

  /**
   * Tarea create
   */
  export type TareaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The data needed to create a Tarea.
     */
    data: XOR<TareaCreateInput, TareaUncheckedCreateInput>
  }

  /**
   * Tarea createMany
   */
  export type TareaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tareas.
     */
    data: TareaCreateManyInput | TareaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tarea createManyAndReturn
   */
  export type TareaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * The data used to create many Tareas.
     */
    data: TareaCreateManyInput | TareaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tarea update
   */
  export type TareaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The data needed to update a Tarea.
     */
    data: XOR<TareaUpdateInput, TareaUncheckedUpdateInput>
    /**
     * Choose, which Tarea to update.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea updateMany
   */
  export type TareaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tareas.
     */
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyInput>
    /**
     * Filter which Tareas to update
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to update.
     */
    limit?: number
  }

  /**
   * Tarea updateManyAndReturn
   */
  export type TareaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * The data used to update Tareas.
     */
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyInput>
    /**
     * Filter which Tareas to update
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tarea upsert
   */
  export type TareaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * The filter to search for the Tarea to update in case it exists.
     */
    where: TareaWhereUniqueInput
    /**
     * In case the Tarea found by the `where` argument doesn't exist, create a new Tarea with this data.
     */
    create: XOR<TareaCreateInput, TareaUncheckedCreateInput>
    /**
     * In case the Tarea was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TareaUpdateInput, TareaUncheckedUpdateInput>
  }

  /**
   * Tarea delete
   */
  export type TareaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
    /**
     * Filter which Tarea to delete.
     */
    where: TareaWhereUniqueInput
  }

  /**
   * Tarea deleteMany
   */
  export type TareaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tareas to delete
     */
    where?: TareaWhereInput
    /**
     * Limit how many Tareas to delete.
     */
    limit?: number
  }

  /**
   * Tarea without action
   */
  export type TareaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tarea
     */
    select?: TareaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tarea
     */
    omit?: TareaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TareaInclude<ExtArgs> | null
  }


  /**
   * Model ColectivoProfesor
   */

  export type AggregateColectivoProfesor = {
    _count: ColectivoProfesorCountAggregateOutputType | null
    _min: ColectivoProfesorMinAggregateOutputType | null
    _max: ColectivoProfesorMaxAggregateOutputType | null
  }

  export type ColectivoProfesorMinAggregateOutputType = {
    colectivoId: string | null
    userId: string | null
    asignatura: string | null
    createdAt: Date | null
  }

  export type ColectivoProfesorMaxAggregateOutputType = {
    colectivoId: string | null
    userId: string | null
    asignatura: string | null
    createdAt: Date | null
  }

  export type ColectivoProfesorCountAggregateOutputType = {
    colectivoId: number
    userId: number
    asignatura: number
    createdAt: number
    _all: number
  }


  export type ColectivoProfesorMinAggregateInputType = {
    colectivoId?: true
    userId?: true
    asignatura?: true
    createdAt?: true
  }

  export type ColectivoProfesorMaxAggregateInputType = {
    colectivoId?: true
    userId?: true
    asignatura?: true
    createdAt?: true
  }

  export type ColectivoProfesorCountAggregateInputType = {
    colectivoId?: true
    userId?: true
    asignatura?: true
    createdAt?: true
    _all?: true
  }

  export type ColectivoProfesorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColectivoProfesor to aggregate.
     */
    where?: ColectivoProfesorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColectivoProfesors to fetch.
     */
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColectivoProfesorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColectivoProfesors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColectivoProfesors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ColectivoProfesors
    **/
    _count?: true | ColectivoProfesorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColectivoProfesorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColectivoProfesorMaxAggregateInputType
  }

  export type GetColectivoProfesorAggregateType<T extends ColectivoProfesorAggregateArgs> = {
        [P in keyof T & keyof AggregateColectivoProfesor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColectivoProfesor[P]>
      : GetScalarType<T[P], AggregateColectivoProfesor[P]>
  }




  export type ColectivoProfesorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColectivoProfesorWhereInput
    orderBy?: ColectivoProfesorOrderByWithAggregationInput | ColectivoProfesorOrderByWithAggregationInput[]
    by: ColectivoProfesorScalarFieldEnum[] | ColectivoProfesorScalarFieldEnum
    having?: ColectivoProfesorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColectivoProfesorCountAggregateInputType | true
    _min?: ColectivoProfesorMinAggregateInputType
    _max?: ColectivoProfesorMaxAggregateInputType
  }

  export type ColectivoProfesorGroupByOutputType = {
    colectivoId: string
    userId: string
    asignatura: string
    createdAt: Date
    _count: ColectivoProfesorCountAggregateOutputType | null
    _min: ColectivoProfesorMinAggregateOutputType | null
    _max: ColectivoProfesorMaxAggregateOutputType | null
  }

  type GetColectivoProfesorGroupByPayload<T extends ColectivoProfesorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColectivoProfesorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColectivoProfesorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColectivoProfesorGroupByOutputType[P]>
            : GetScalarType<T[P], ColectivoProfesorGroupByOutputType[P]>
        }
      >
    >


  export type ColectivoProfesorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    userId?: boolean
    asignatura?: boolean
    createdAt?: boolean
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colectivoProfesor"]>

  export type ColectivoProfesorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    userId?: boolean
    asignatura?: boolean
    createdAt?: boolean
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colectivoProfesor"]>

  export type ColectivoProfesorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    colectivoId?: boolean
    userId?: boolean
    asignatura?: boolean
    createdAt?: boolean
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colectivoProfesor"]>

  export type ColectivoProfesorSelectScalar = {
    colectivoId?: boolean
    userId?: boolean
    asignatura?: boolean
    createdAt?: boolean
  }

  export type ColectivoProfesorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"colectivoId" | "userId" | "asignatura" | "createdAt", ExtArgs["result"]["colectivoProfesor"]>
  export type ColectivoProfesorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ColectivoProfesorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ColectivoProfesorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colectivo?: boolean | ColectivoDefaultArgs<ExtArgs>
    profesor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ColectivoProfesorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ColectivoProfesor"
    objects: {
      colectivo: Prisma.$ColectivoPayload<ExtArgs>
      profesor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      colectivoId: string
      userId: string
      asignatura: string
      createdAt: Date
    }, ExtArgs["result"]["colectivoProfesor"]>
    composites: {}
  }

  type ColectivoProfesorGetPayload<S extends boolean | null | undefined | ColectivoProfesorDefaultArgs> = $Result.GetResult<Prisma.$ColectivoProfesorPayload, S>

  type ColectivoProfesorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColectivoProfesorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColectivoProfesorCountAggregateInputType | true
    }

  export interface ColectivoProfesorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ColectivoProfesor'], meta: { name: 'ColectivoProfesor' } }
    /**
     * Find zero or one ColectivoProfesor that matches the filter.
     * @param {ColectivoProfesorFindUniqueArgs} args - Arguments to find a ColectivoProfesor
     * @example
     * // Get one ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColectivoProfesorFindUniqueArgs>(args: SelectSubset<T, ColectivoProfesorFindUniqueArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ColectivoProfesor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColectivoProfesorFindUniqueOrThrowArgs} args - Arguments to find a ColectivoProfesor
     * @example
     * // Get one ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColectivoProfesorFindUniqueOrThrowArgs>(args: SelectSubset<T, ColectivoProfesorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColectivoProfesor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorFindFirstArgs} args - Arguments to find a ColectivoProfesor
     * @example
     * // Get one ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColectivoProfesorFindFirstArgs>(args?: SelectSubset<T, ColectivoProfesorFindFirstArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ColectivoProfesor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorFindFirstOrThrowArgs} args - Arguments to find a ColectivoProfesor
     * @example
     * // Get one ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColectivoProfesorFindFirstOrThrowArgs>(args?: SelectSubset<T, ColectivoProfesorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ColectivoProfesors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ColectivoProfesors
     * const colectivoProfesors = await prisma.colectivoProfesor.findMany()
     * 
     * // Get first 10 ColectivoProfesors
     * const colectivoProfesors = await prisma.colectivoProfesor.findMany({ take: 10 })
     * 
     * // Only select the `colectivoId`
     * const colectivoProfesorWithColectivoIdOnly = await prisma.colectivoProfesor.findMany({ select: { colectivoId: true } })
     * 
     */
    findMany<T extends ColectivoProfesorFindManyArgs>(args?: SelectSubset<T, ColectivoProfesorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ColectivoProfesor.
     * @param {ColectivoProfesorCreateArgs} args - Arguments to create a ColectivoProfesor.
     * @example
     * // Create one ColectivoProfesor
     * const ColectivoProfesor = await prisma.colectivoProfesor.create({
     *   data: {
     *     // ... data to create a ColectivoProfesor
     *   }
     * })
     * 
     */
    create<T extends ColectivoProfesorCreateArgs>(args: SelectSubset<T, ColectivoProfesorCreateArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ColectivoProfesors.
     * @param {ColectivoProfesorCreateManyArgs} args - Arguments to create many ColectivoProfesors.
     * @example
     * // Create many ColectivoProfesors
     * const colectivoProfesor = await prisma.colectivoProfesor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColectivoProfesorCreateManyArgs>(args?: SelectSubset<T, ColectivoProfesorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ColectivoProfesors and returns the data saved in the database.
     * @param {ColectivoProfesorCreateManyAndReturnArgs} args - Arguments to create many ColectivoProfesors.
     * @example
     * // Create many ColectivoProfesors
     * const colectivoProfesor = await prisma.colectivoProfesor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ColectivoProfesors and only return the `colectivoId`
     * const colectivoProfesorWithColectivoIdOnly = await prisma.colectivoProfesor.createManyAndReturn({
     *   select: { colectivoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColectivoProfesorCreateManyAndReturnArgs>(args?: SelectSubset<T, ColectivoProfesorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ColectivoProfesor.
     * @param {ColectivoProfesorDeleteArgs} args - Arguments to delete one ColectivoProfesor.
     * @example
     * // Delete one ColectivoProfesor
     * const ColectivoProfesor = await prisma.colectivoProfesor.delete({
     *   where: {
     *     // ... filter to delete one ColectivoProfesor
     *   }
     * })
     * 
     */
    delete<T extends ColectivoProfesorDeleteArgs>(args: SelectSubset<T, ColectivoProfesorDeleteArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ColectivoProfesor.
     * @param {ColectivoProfesorUpdateArgs} args - Arguments to update one ColectivoProfesor.
     * @example
     * // Update one ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColectivoProfesorUpdateArgs>(args: SelectSubset<T, ColectivoProfesorUpdateArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ColectivoProfesors.
     * @param {ColectivoProfesorDeleteManyArgs} args - Arguments to filter ColectivoProfesors to delete.
     * @example
     * // Delete a few ColectivoProfesors
     * const { count } = await prisma.colectivoProfesor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColectivoProfesorDeleteManyArgs>(args?: SelectSubset<T, ColectivoProfesorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColectivoProfesors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ColectivoProfesors
     * const colectivoProfesor = await prisma.colectivoProfesor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColectivoProfesorUpdateManyArgs>(args: SelectSubset<T, ColectivoProfesorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColectivoProfesors and returns the data updated in the database.
     * @param {ColectivoProfesorUpdateManyAndReturnArgs} args - Arguments to update many ColectivoProfesors.
     * @example
     * // Update many ColectivoProfesors
     * const colectivoProfesor = await prisma.colectivoProfesor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ColectivoProfesors and only return the `colectivoId`
     * const colectivoProfesorWithColectivoIdOnly = await prisma.colectivoProfesor.updateManyAndReturn({
     *   select: { colectivoId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColectivoProfesorUpdateManyAndReturnArgs>(args: SelectSubset<T, ColectivoProfesorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ColectivoProfesor.
     * @param {ColectivoProfesorUpsertArgs} args - Arguments to update or create a ColectivoProfesor.
     * @example
     * // Update or create a ColectivoProfesor
     * const colectivoProfesor = await prisma.colectivoProfesor.upsert({
     *   create: {
     *     // ... data to create a ColectivoProfesor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ColectivoProfesor we want to update
     *   }
     * })
     */
    upsert<T extends ColectivoProfesorUpsertArgs>(args: SelectSubset<T, ColectivoProfesorUpsertArgs<ExtArgs>>): Prisma__ColectivoProfesorClient<$Result.GetResult<Prisma.$ColectivoProfesorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ColectivoProfesors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorCountArgs} args - Arguments to filter ColectivoProfesors to count.
     * @example
     * // Count the number of ColectivoProfesors
     * const count = await prisma.colectivoProfesor.count({
     *   where: {
     *     // ... the filter for the ColectivoProfesors we want to count
     *   }
     * })
    **/
    count<T extends ColectivoProfesorCountArgs>(
      args?: Subset<T, ColectivoProfesorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColectivoProfesorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ColectivoProfesor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColectivoProfesorAggregateArgs>(args: Subset<T, ColectivoProfesorAggregateArgs>): Prisma.PrismaPromise<GetColectivoProfesorAggregateType<T>>

    /**
     * Group by ColectivoProfesor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColectivoProfesorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColectivoProfesorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColectivoProfesorGroupByArgs['orderBy'] }
        : { orderBy?: ColectivoProfesorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColectivoProfesorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColectivoProfesorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ColectivoProfesor model
   */
  readonly fields: ColectivoProfesorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ColectivoProfesor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColectivoProfesorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    colectivo<T extends ColectivoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ColectivoDefaultArgs<ExtArgs>>): Prisma__ColectivoClient<$Result.GetResult<Prisma.$ColectivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profesor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ColectivoProfesor model
   */
  interface ColectivoProfesorFieldRefs {
    readonly colectivoId: FieldRef<"ColectivoProfesor", 'String'>
    readonly userId: FieldRef<"ColectivoProfesor", 'String'>
    readonly asignatura: FieldRef<"ColectivoProfesor", 'String'>
    readonly createdAt: FieldRef<"ColectivoProfesor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ColectivoProfesor findUnique
   */
  export type ColectivoProfesorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter, which ColectivoProfesor to fetch.
     */
    where: ColectivoProfesorWhereUniqueInput
  }

  /**
   * ColectivoProfesor findUniqueOrThrow
   */
  export type ColectivoProfesorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter, which ColectivoProfesor to fetch.
     */
    where: ColectivoProfesorWhereUniqueInput
  }

  /**
   * ColectivoProfesor findFirst
   */
  export type ColectivoProfesorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter, which ColectivoProfesor to fetch.
     */
    where?: ColectivoProfesorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColectivoProfesors to fetch.
     */
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColectivoProfesors.
     */
    cursor?: ColectivoProfesorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColectivoProfesors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColectivoProfesors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColectivoProfesors.
     */
    distinct?: ColectivoProfesorScalarFieldEnum | ColectivoProfesorScalarFieldEnum[]
  }

  /**
   * ColectivoProfesor findFirstOrThrow
   */
  export type ColectivoProfesorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter, which ColectivoProfesor to fetch.
     */
    where?: ColectivoProfesorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColectivoProfesors to fetch.
     */
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColectivoProfesors.
     */
    cursor?: ColectivoProfesorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColectivoProfesors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColectivoProfesors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColectivoProfesors.
     */
    distinct?: ColectivoProfesorScalarFieldEnum | ColectivoProfesorScalarFieldEnum[]
  }

  /**
   * ColectivoProfesor findMany
   */
  export type ColectivoProfesorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter, which ColectivoProfesors to fetch.
     */
    where?: ColectivoProfesorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColectivoProfesors to fetch.
     */
    orderBy?: ColectivoProfesorOrderByWithRelationInput | ColectivoProfesorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ColectivoProfesors.
     */
    cursor?: ColectivoProfesorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColectivoProfesors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColectivoProfesors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColectivoProfesors.
     */
    distinct?: ColectivoProfesorScalarFieldEnum | ColectivoProfesorScalarFieldEnum[]
  }

  /**
   * ColectivoProfesor create
   */
  export type ColectivoProfesorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * The data needed to create a ColectivoProfesor.
     */
    data: XOR<ColectivoProfesorCreateInput, ColectivoProfesorUncheckedCreateInput>
  }

  /**
   * ColectivoProfesor createMany
   */
  export type ColectivoProfesorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ColectivoProfesors.
     */
    data: ColectivoProfesorCreateManyInput | ColectivoProfesorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ColectivoProfesor createManyAndReturn
   */
  export type ColectivoProfesorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * The data used to create many ColectivoProfesors.
     */
    data: ColectivoProfesorCreateManyInput | ColectivoProfesorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColectivoProfesor update
   */
  export type ColectivoProfesorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * The data needed to update a ColectivoProfesor.
     */
    data: XOR<ColectivoProfesorUpdateInput, ColectivoProfesorUncheckedUpdateInput>
    /**
     * Choose, which ColectivoProfesor to update.
     */
    where: ColectivoProfesorWhereUniqueInput
  }

  /**
   * ColectivoProfesor updateMany
   */
  export type ColectivoProfesorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ColectivoProfesors.
     */
    data: XOR<ColectivoProfesorUpdateManyMutationInput, ColectivoProfesorUncheckedUpdateManyInput>
    /**
     * Filter which ColectivoProfesors to update
     */
    where?: ColectivoProfesorWhereInput
    /**
     * Limit how many ColectivoProfesors to update.
     */
    limit?: number
  }

  /**
   * ColectivoProfesor updateManyAndReturn
   */
  export type ColectivoProfesorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * The data used to update ColectivoProfesors.
     */
    data: XOR<ColectivoProfesorUpdateManyMutationInput, ColectivoProfesorUncheckedUpdateManyInput>
    /**
     * Filter which ColectivoProfesors to update
     */
    where?: ColectivoProfesorWhereInput
    /**
     * Limit how many ColectivoProfesors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColectivoProfesor upsert
   */
  export type ColectivoProfesorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * The filter to search for the ColectivoProfesor to update in case it exists.
     */
    where: ColectivoProfesorWhereUniqueInput
    /**
     * In case the ColectivoProfesor found by the `where` argument doesn't exist, create a new ColectivoProfesor with this data.
     */
    create: XOR<ColectivoProfesorCreateInput, ColectivoProfesorUncheckedCreateInput>
    /**
     * In case the ColectivoProfesor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColectivoProfesorUpdateInput, ColectivoProfesorUncheckedUpdateInput>
  }

  /**
   * ColectivoProfesor delete
   */
  export type ColectivoProfesorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
    /**
     * Filter which ColectivoProfesor to delete.
     */
    where: ColectivoProfesorWhereUniqueInput
  }

  /**
   * ColectivoProfesor deleteMany
   */
  export type ColectivoProfesorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColectivoProfesors to delete
     */
    where?: ColectivoProfesorWhereInput
    /**
     * Limit how many ColectivoProfesors to delete.
     */
    limit?: number
  }

  /**
   * ColectivoProfesor without action
   */
  export type ColectivoProfesorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColectivoProfesor
     */
    select?: ColectivoProfesorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ColectivoProfesor
     */
    omit?: ColectivoProfesorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColectivoProfesorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    userName: 'userName',
    password: 'password',
    rol: 'rol',
    apellido: 'apellido',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ColectivoScalarFieldEnum: {
    colectivoId: 'colectivoId',
    nombreColectivo: 'nombreColectivo',
    year: 'year',
    modalidad: 'modalidad',
    createdAt: 'createdAt'
  };

  export type ColectivoScalarFieldEnum = (typeof ColectivoScalarFieldEnum)[keyof typeof ColectivoScalarFieldEnum]


  export const TareaScalarFieldEnum: {
    tareaId: 'tareaId',
    nombreTarea: 'nombreTarea',
    descripcion: 'descripcion',
    fechaLimite: 'fechaLimite',
    estado: 'estado',
    userId: 'userId'
  };

  export type TareaScalarFieldEnum = (typeof TareaScalarFieldEnum)[keyof typeof TareaScalarFieldEnum]


  export const ColectivoProfesorScalarFieldEnum: {
    colectivoId: 'colectivoId',
    userId: 'userId',
    asignatura: 'asignatura',
    createdAt: 'createdAt'
  };

  export type ColectivoProfesorScalarFieldEnum = (typeof ColectivoProfesorScalarFieldEnum)[keyof typeof ColectivoProfesorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Rol'
   */
  export type EnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol'>
    


  /**
   * Reference to a field of type 'Rol[]'
   */
  export type ListEnumRolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Rol[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Modalidad'
   */
  export type EnumModalidadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidad'>
    


  /**
   * Reference to a field of type 'Modalidad[]'
   */
  export type ListEnumModalidadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modalidad[]'>
    


  /**
   * Reference to a field of type 'estadoTarea'
   */
  export type EnumestadoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'estadoTarea'>
    


  /**
   * Reference to a field of type 'estadoTarea[]'
   */
  export type ListEnumestadoTareaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'estadoTarea[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: StringFilter<"User"> | string
    userName?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    rol?: EnumRolFilter<"User"> | $Enums.Rol
    apellido?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    colectivos?: ColectivoProfesorListRelationFilter
    tareas?: TareaListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    userName?: SortOrder
    password?: SortOrderInput | SortOrder
    rol?: SortOrder
    apellido?: SortOrder
    createdAt?: SortOrder
    colectivos?: ColectivoProfesorOrderByRelationAggregateInput
    tareas?: TareaOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userName?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    rol?: EnumRolFilter<"User"> | $Enums.Rol
    apellido?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    colectivos?: ColectivoProfesorListRelationFilter
    tareas?: TareaListRelationFilter
  }, "userId">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    userName?: SortOrder
    password?: SortOrderInput | SortOrder
    rol?: SortOrder
    apellido?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"User"> | string
    userName?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    rol?: EnumRolWithAggregatesFilter<"User"> | $Enums.Rol
    apellido?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ColectivoWhereInput = {
    AND?: ColectivoWhereInput | ColectivoWhereInput[]
    OR?: ColectivoWhereInput[]
    NOT?: ColectivoWhereInput | ColectivoWhereInput[]
    colectivoId?: StringFilter<"Colectivo"> | string
    nombreColectivo?: StringFilter<"Colectivo"> | string
    year?: IntFilter<"Colectivo"> | number
    modalidad?: EnumModalidadFilter<"Colectivo"> | $Enums.Modalidad
    createdAt?: DateTimeFilter<"Colectivo"> | Date | string
    profesores?: ColectivoProfesorListRelationFilter
  }

  export type ColectivoOrderByWithRelationInput = {
    colectivoId?: SortOrder
    nombreColectivo?: SortOrder
    year?: SortOrder
    modalidad?: SortOrder
    createdAt?: SortOrder
    profesores?: ColectivoProfesorOrderByRelationAggregateInput
  }

  export type ColectivoWhereUniqueInput = Prisma.AtLeast<{
    colectivoId?: string
    AND?: ColectivoWhereInput | ColectivoWhereInput[]
    OR?: ColectivoWhereInput[]
    NOT?: ColectivoWhereInput | ColectivoWhereInput[]
    nombreColectivo?: StringFilter<"Colectivo"> | string
    year?: IntFilter<"Colectivo"> | number
    modalidad?: EnumModalidadFilter<"Colectivo"> | $Enums.Modalidad
    createdAt?: DateTimeFilter<"Colectivo"> | Date | string
    profesores?: ColectivoProfesorListRelationFilter
  }, "colectivoId">

  export type ColectivoOrderByWithAggregationInput = {
    colectivoId?: SortOrder
    nombreColectivo?: SortOrder
    year?: SortOrder
    modalidad?: SortOrder
    createdAt?: SortOrder
    _count?: ColectivoCountOrderByAggregateInput
    _avg?: ColectivoAvgOrderByAggregateInput
    _max?: ColectivoMaxOrderByAggregateInput
    _min?: ColectivoMinOrderByAggregateInput
    _sum?: ColectivoSumOrderByAggregateInput
  }

  export type ColectivoScalarWhereWithAggregatesInput = {
    AND?: ColectivoScalarWhereWithAggregatesInput | ColectivoScalarWhereWithAggregatesInput[]
    OR?: ColectivoScalarWhereWithAggregatesInput[]
    NOT?: ColectivoScalarWhereWithAggregatesInput | ColectivoScalarWhereWithAggregatesInput[]
    colectivoId?: StringWithAggregatesFilter<"Colectivo"> | string
    nombreColectivo?: StringWithAggregatesFilter<"Colectivo"> | string
    year?: IntWithAggregatesFilter<"Colectivo"> | number
    modalidad?: EnumModalidadWithAggregatesFilter<"Colectivo"> | $Enums.Modalidad
    createdAt?: DateTimeWithAggregatesFilter<"Colectivo"> | Date | string
  }

  export type TareaWhereInput = {
    AND?: TareaWhereInput | TareaWhereInput[]
    OR?: TareaWhereInput[]
    NOT?: TareaWhereInput | TareaWhereInput[]
    tareaId?: StringFilter<"Tarea"> | string
    nombreTarea?: StringFilter<"Tarea"> | string
    descripcion?: StringFilter<"Tarea"> | string
    fechaLimite?: DateTimeFilter<"Tarea"> | Date | string
    estado?: EnumestadoTareaFilter<"Tarea"> | $Enums.estadoTarea
    userId?: StringFilter<"Tarea"> | string
    profesor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TareaOrderByWithRelationInput = {
    tareaId?: SortOrder
    nombreTarea?: SortOrder
    descripcion?: SortOrder
    fechaLimite?: SortOrder
    estado?: SortOrder
    userId?: SortOrder
    profesor?: UserOrderByWithRelationInput
  }

  export type TareaWhereUniqueInput = Prisma.AtLeast<{
    tareaId?: string
    AND?: TareaWhereInput | TareaWhereInput[]
    OR?: TareaWhereInput[]
    NOT?: TareaWhereInput | TareaWhereInput[]
    nombreTarea?: StringFilter<"Tarea"> | string
    descripcion?: StringFilter<"Tarea"> | string
    fechaLimite?: DateTimeFilter<"Tarea"> | Date | string
    estado?: EnumestadoTareaFilter<"Tarea"> | $Enums.estadoTarea
    userId?: StringFilter<"Tarea"> | string
    profesor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "tareaId">

  export type TareaOrderByWithAggregationInput = {
    tareaId?: SortOrder
    nombreTarea?: SortOrder
    descripcion?: SortOrder
    fechaLimite?: SortOrder
    estado?: SortOrder
    userId?: SortOrder
    _count?: TareaCountOrderByAggregateInput
    _max?: TareaMaxOrderByAggregateInput
    _min?: TareaMinOrderByAggregateInput
  }

  export type TareaScalarWhereWithAggregatesInput = {
    AND?: TareaScalarWhereWithAggregatesInput | TareaScalarWhereWithAggregatesInput[]
    OR?: TareaScalarWhereWithAggregatesInput[]
    NOT?: TareaScalarWhereWithAggregatesInput | TareaScalarWhereWithAggregatesInput[]
    tareaId?: StringWithAggregatesFilter<"Tarea"> | string
    nombreTarea?: StringWithAggregatesFilter<"Tarea"> | string
    descripcion?: StringWithAggregatesFilter<"Tarea"> | string
    fechaLimite?: DateTimeWithAggregatesFilter<"Tarea"> | Date | string
    estado?: EnumestadoTareaWithAggregatesFilter<"Tarea"> | $Enums.estadoTarea
    userId?: StringWithAggregatesFilter<"Tarea"> | string
  }

  export type ColectivoProfesorWhereInput = {
    AND?: ColectivoProfesorWhereInput | ColectivoProfesorWhereInput[]
    OR?: ColectivoProfesorWhereInput[]
    NOT?: ColectivoProfesorWhereInput | ColectivoProfesorWhereInput[]
    colectivoId?: StringFilter<"ColectivoProfesor"> | string
    userId?: StringFilter<"ColectivoProfesor"> | string
    asignatura?: StringFilter<"ColectivoProfesor"> | string
    createdAt?: DateTimeFilter<"ColectivoProfesor"> | Date | string
    colectivo?: XOR<ColectivoScalarRelationFilter, ColectivoWhereInput>
    profesor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ColectivoProfesorOrderByWithRelationInput = {
    colectivoId?: SortOrder
    userId?: SortOrder
    asignatura?: SortOrder
    createdAt?: SortOrder
    colectivo?: ColectivoOrderByWithRelationInput
    profesor?: UserOrderByWithRelationInput
  }

  export type ColectivoProfesorWhereUniqueInput = Prisma.AtLeast<{
    colectivoId_userId?: ColectivoProfesorColectivoIdUserIdCompoundUniqueInput
    AND?: ColectivoProfesorWhereInput | ColectivoProfesorWhereInput[]
    OR?: ColectivoProfesorWhereInput[]
    NOT?: ColectivoProfesorWhereInput | ColectivoProfesorWhereInput[]
    colectivoId?: StringFilter<"ColectivoProfesor"> | string
    userId?: StringFilter<"ColectivoProfesor"> | string
    asignatura?: StringFilter<"ColectivoProfesor"> | string
    createdAt?: DateTimeFilter<"ColectivoProfesor"> | Date | string
    colectivo?: XOR<ColectivoScalarRelationFilter, ColectivoWhereInput>
    profesor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "colectivoId_userId">

  export type ColectivoProfesorOrderByWithAggregationInput = {
    colectivoId?: SortOrder
    userId?: SortOrder
    asignatura?: SortOrder
    createdAt?: SortOrder
    _count?: ColectivoProfesorCountOrderByAggregateInput
    _max?: ColectivoProfesorMaxOrderByAggregateInput
    _min?: ColectivoProfesorMinOrderByAggregateInput
  }

  export type ColectivoProfesorScalarWhereWithAggregatesInput = {
    AND?: ColectivoProfesorScalarWhereWithAggregatesInput | ColectivoProfesorScalarWhereWithAggregatesInput[]
    OR?: ColectivoProfesorScalarWhereWithAggregatesInput[]
    NOT?: ColectivoProfesorScalarWhereWithAggregatesInput | ColectivoProfesorScalarWhereWithAggregatesInput[]
    colectivoId?: StringWithAggregatesFilter<"ColectivoProfesor"> | string
    userId?: StringWithAggregatesFilter<"ColectivoProfesor"> | string
    asignatura?: StringWithAggregatesFilter<"ColectivoProfesor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ColectivoProfesor"> | Date | string
  }

  export type UserCreateInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    colectivos?: ColectivoProfesorCreateNestedManyWithoutProfesorInput
    tareas?: TareaCreateNestedManyWithoutProfesorInput
  }

  export type UserUncheckedCreateInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    colectivos?: ColectivoProfesorUncheckedCreateNestedManyWithoutProfesorInput
    tareas?: TareaUncheckedCreateNestedManyWithoutProfesorInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivos?: ColectivoProfesorUpdateManyWithoutProfesorNestedInput
    tareas?: TareaUpdateManyWithoutProfesorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivos?: ColectivoProfesorUncheckedUpdateManyWithoutProfesorNestedInput
    tareas?: TareaUncheckedUpdateManyWithoutProfesorNestedInput
  }

  export type UserCreateManyInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoCreateInput = {
    colectivoId?: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt?: Date | string
    profesores?: ColectivoProfesorCreateNestedManyWithoutColectivoInput
  }

  export type ColectivoUncheckedCreateInput = {
    colectivoId?: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt?: Date | string
    profesores?: ColectivoProfesorUncheckedCreateNestedManyWithoutColectivoInput
  }

  export type ColectivoUpdateInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profesores?: ColectivoProfesorUpdateManyWithoutColectivoNestedInput
  }

  export type ColectivoUncheckedUpdateInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profesores?: ColectivoProfesorUncheckedUpdateManyWithoutColectivoNestedInput
  }

  export type ColectivoCreateManyInput = {
    colectivoId?: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt?: Date | string
  }

  export type ColectivoUpdateManyMutationInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoUncheckedUpdateManyInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaCreateInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
    profesor: UserCreateNestedOneWithoutTareasInput
  }

  export type TareaUncheckedCreateInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
    userId: string
  }

  export type TareaUpdateInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
    profesor?: UserUpdateOneRequiredWithoutTareasNestedInput
  }

  export type TareaUncheckedUpdateInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TareaCreateManyInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
    userId: string
  }

  export type TareaUpdateManyMutationInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
  }

  export type TareaUncheckedUpdateManyInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ColectivoProfesorCreateInput = {
    asignatura: string
    createdAt?: Date | string
    colectivo: ColectivoCreateNestedOneWithoutProfesoresInput
    profesor: UserCreateNestedOneWithoutColectivosInput
  }

  export type ColectivoProfesorUncheckedCreateInput = {
    colectivoId: string
    userId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type ColectivoProfesorUpdateInput = {
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivo?: ColectivoUpdateOneRequiredWithoutProfesoresNestedInput
    profesor?: UserUpdateOneRequiredWithoutColectivosNestedInput
  }

  export type ColectivoProfesorUncheckedUpdateInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoProfesorCreateManyInput = {
    colectivoId: string
    userId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type ColectivoProfesorUpdateManyMutationInput = {
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoProfesorUncheckedUpdateManyInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ColectivoProfesorListRelationFilter = {
    every?: ColectivoProfesorWhereInput
    some?: ColectivoProfesorWhereInput
    none?: ColectivoProfesorWhereInput
  }

  export type TareaListRelationFilter = {
    every?: TareaWhereInput
    some?: TareaWhereInput
    none?: TareaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ColectivoProfesorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TareaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    apellido?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    apellido?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    apellido?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumModalidadFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | EnumModalidadFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadFilter<$PrismaModel> | $Enums.Modalidad
  }

  export type ColectivoCountOrderByAggregateInput = {
    colectivoId?: SortOrder
    nombreColectivo?: SortOrder
    year?: SortOrder
    modalidad?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type ColectivoMaxOrderByAggregateInput = {
    colectivoId?: SortOrder
    nombreColectivo?: SortOrder
    year?: SortOrder
    modalidad?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoMinOrderByAggregateInput = {
    colectivoId?: SortOrder
    nombreColectivo?: SortOrder
    year?: SortOrder
    modalidad?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumModalidadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | EnumModalidadFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadWithAggregatesFilter<$PrismaModel> | $Enums.Modalidad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalidadFilter<$PrismaModel>
    _max?: NestedEnumModalidadFilter<$PrismaModel>
  }

  export type EnumestadoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.estadoTarea | EnumestadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumestadoTareaFilter<$PrismaModel> | $Enums.estadoTarea
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TareaCountOrderByAggregateInput = {
    tareaId?: SortOrder
    nombreTarea?: SortOrder
    descripcion?: SortOrder
    fechaLimite?: SortOrder
    estado?: SortOrder
    userId?: SortOrder
  }

  export type TareaMaxOrderByAggregateInput = {
    tareaId?: SortOrder
    nombreTarea?: SortOrder
    descripcion?: SortOrder
    fechaLimite?: SortOrder
    estado?: SortOrder
    userId?: SortOrder
  }

  export type TareaMinOrderByAggregateInput = {
    tareaId?: SortOrder
    nombreTarea?: SortOrder
    descripcion?: SortOrder
    fechaLimite?: SortOrder
    estado?: SortOrder
    userId?: SortOrder
  }

  export type EnumestadoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.estadoTarea | EnumestadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumestadoTareaWithAggregatesFilter<$PrismaModel> | $Enums.estadoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumestadoTareaFilter<$PrismaModel>
    _max?: NestedEnumestadoTareaFilter<$PrismaModel>
  }

  export type ColectivoScalarRelationFilter = {
    is?: ColectivoWhereInput
    isNot?: ColectivoWhereInput
  }

  export type ColectivoProfesorColectivoIdUserIdCompoundUniqueInput = {
    colectivoId: string
    userId: string
  }

  export type ColectivoProfesorCountOrderByAggregateInput = {
    colectivoId?: SortOrder
    userId?: SortOrder
    asignatura?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoProfesorMaxOrderByAggregateInput = {
    colectivoId?: SortOrder
    userId?: SortOrder
    asignatura?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoProfesorMinOrderByAggregateInput = {
    colectivoId?: SortOrder
    userId?: SortOrder
    asignatura?: SortOrder
    createdAt?: SortOrder
  }

  export type ColectivoProfesorCreateNestedManyWithoutProfesorInput = {
    create?: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput> | ColectivoProfesorCreateWithoutProfesorInput[] | ColectivoProfesorUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutProfesorInput | ColectivoProfesorCreateOrConnectWithoutProfesorInput[]
    createMany?: ColectivoProfesorCreateManyProfesorInputEnvelope
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
  }

  export type TareaCreateNestedManyWithoutProfesorInput = {
    create?: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput> | TareaCreateWithoutProfesorInput[] | TareaUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProfesorInput | TareaCreateOrConnectWithoutProfesorInput[]
    createMany?: TareaCreateManyProfesorInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type ColectivoProfesorUncheckedCreateNestedManyWithoutProfesorInput = {
    create?: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput> | ColectivoProfesorCreateWithoutProfesorInput[] | ColectivoProfesorUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutProfesorInput | ColectivoProfesorCreateOrConnectWithoutProfesorInput[]
    createMany?: ColectivoProfesorCreateManyProfesorInputEnvelope
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
  }

  export type TareaUncheckedCreateNestedManyWithoutProfesorInput = {
    create?: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput> | TareaCreateWithoutProfesorInput[] | TareaUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProfesorInput | TareaCreateOrConnectWithoutProfesorInput[]
    createMany?: TareaCreateManyProfesorInputEnvelope
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRolFieldUpdateOperationsInput = {
    set?: $Enums.Rol
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ColectivoProfesorUpdateManyWithoutProfesorNestedInput = {
    create?: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput> | ColectivoProfesorCreateWithoutProfesorInput[] | ColectivoProfesorUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutProfesorInput | ColectivoProfesorCreateOrConnectWithoutProfesorInput[]
    upsert?: ColectivoProfesorUpsertWithWhereUniqueWithoutProfesorInput | ColectivoProfesorUpsertWithWhereUniqueWithoutProfesorInput[]
    createMany?: ColectivoProfesorCreateManyProfesorInputEnvelope
    set?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    disconnect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    delete?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    update?: ColectivoProfesorUpdateWithWhereUniqueWithoutProfesorInput | ColectivoProfesorUpdateWithWhereUniqueWithoutProfesorInput[]
    updateMany?: ColectivoProfesorUpdateManyWithWhereWithoutProfesorInput | ColectivoProfesorUpdateManyWithWhereWithoutProfesorInput[]
    deleteMany?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
  }

  export type TareaUpdateManyWithoutProfesorNestedInput = {
    create?: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput> | TareaCreateWithoutProfesorInput[] | TareaUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProfesorInput | TareaCreateOrConnectWithoutProfesorInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutProfesorInput | TareaUpsertWithWhereUniqueWithoutProfesorInput[]
    createMany?: TareaCreateManyProfesorInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutProfesorInput | TareaUpdateWithWhereUniqueWithoutProfesorInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutProfesorInput | TareaUpdateManyWithWhereWithoutProfesorInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type ColectivoProfesorUncheckedUpdateManyWithoutProfesorNestedInput = {
    create?: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput> | ColectivoProfesorCreateWithoutProfesorInput[] | ColectivoProfesorUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutProfesorInput | ColectivoProfesorCreateOrConnectWithoutProfesorInput[]
    upsert?: ColectivoProfesorUpsertWithWhereUniqueWithoutProfesorInput | ColectivoProfesorUpsertWithWhereUniqueWithoutProfesorInput[]
    createMany?: ColectivoProfesorCreateManyProfesorInputEnvelope
    set?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    disconnect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    delete?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    update?: ColectivoProfesorUpdateWithWhereUniqueWithoutProfesorInput | ColectivoProfesorUpdateWithWhereUniqueWithoutProfesorInput[]
    updateMany?: ColectivoProfesorUpdateManyWithWhereWithoutProfesorInput | ColectivoProfesorUpdateManyWithWhereWithoutProfesorInput[]
    deleteMany?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
  }

  export type TareaUncheckedUpdateManyWithoutProfesorNestedInput = {
    create?: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput> | TareaCreateWithoutProfesorInput[] | TareaUncheckedCreateWithoutProfesorInput[]
    connectOrCreate?: TareaCreateOrConnectWithoutProfesorInput | TareaCreateOrConnectWithoutProfesorInput[]
    upsert?: TareaUpsertWithWhereUniqueWithoutProfesorInput | TareaUpsertWithWhereUniqueWithoutProfesorInput[]
    createMany?: TareaCreateManyProfesorInputEnvelope
    set?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    disconnect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    delete?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    connect?: TareaWhereUniqueInput | TareaWhereUniqueInput[]
    update?: TareaUpdateWithWhereUniqueWithoutProfesorInput | TareaUpdateWithWhereUniqueWithoutProfesorInput[]
    updateMany?: TareaUpdateManyWithWhereWithoutProfesorInput | TareaUpdateManyWithWhereWithoutProfesorInput[]
    deleteMany?: TareaScalarWhereInput | TareaScalarWhereInput[]
  }

  export type ColectivoProfesorCreateNestedManyWithoutColectivoInput = {
    create?: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput> | ColectivoProfesorCreateWithoutColectivoInput[] | ColectivoProfesorUncheckedCreateWithoutColectivoInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutColectivoInput | ColectivoProfesorCreateOrConnectWithoutColectivoInput[]
    createMany?: ColectivoProfesorCreateManyColectivoInputEnvelope
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
  }

  export type ColectivoProfesorUncheckedCreateNestedManyWithoutColectivoInput = {
    create?: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput> | ColectivoProfesorCreateWithoutColectivoInput[] | ColectivoProfesorUncheckedCreateWithoutColectivoInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutColectivoInput | ColectivoProfesorCreateOrConnectWithoutColectivoInput[]
    createMany?: ColectivoProfesorCreateManyColectivoInputEnvelope
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumModalidadFieldUpdateOperationsInput = {
    set?: $Enums.Modalidad
  }

  export type ColectivoProfesorUpdateManyWithoutColectivoNestedInput = {
    create?: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput> | ColectivoProfesorCreateWithoutColectivoInput[] | ColectivoProfesorUncheckedCreateWithoutColectivoInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutColectivoInput | ColectivoProfesorCreateOrConnectWithoutColectivoInput[]
    upsert?: ColectivoProfesorUpsertWithWhereUniqueWithoutColectivoInput | ColectivoProfesorUpsertWithWhereUniqueWithoutColectivoInput[]
    createMany?: ColectivoProfesorCreateManyColectivoInputEnvelope
    set?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    disconnect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    delete?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    update?: ColectivoProfesorUpdateWithWhereUniqueWithoutColectivoInput | ColectivoProfesorUpdateWithWhereUniqueWithoutColectivoInput[]
    updateMany?: ColectivoProfesorUpdateManyWithWhereWithoutColectivoInput | ColectivoProfesorUpdateManyWithWhereWithoutColectivoInput[]
    deleteMany?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
  }

  export type ColectivoProfesorUncheckedUpdateManyWithoutColectivoNestedInput = {
    create?: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput> | ColectivoProfesorCreateWithoutColectivoInput[] | ColectivoProfesorUncheckedCreateWithoutColectivoInput[]
    connectOrCreate?: ColectivoProfesorCreateOrConnectWithoutColectivoInput | ColectivoProfesorCreateOrConnectWithoutColectivoInput[]
    upsert?: ColectivoProfesorUpsertWithWhereUniqueWithoutColectivoInput | ColectivoProfesorUpsertWithWhereUniqueWithoutColectivoInput[]
    createMany?: ColectivoProfesorCreateManyColectivoInputEnvelope
    set?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    disconnect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    delete?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    connect?: ColectivoProfesorWhereUniqueInput | ColectivoProfesorWhereUniqueInput[]
    update?: ColectivoProfesorUpdateWithWhereUniqueWithoutColectivoInput | ColectivoProfesorUpdateWithWhereUniqueWithoutColectivoInput[]
    updateMany?: ColectivoProfesorUpdateManyWithWhereWithoutColectivoInput | ColectivoProfesorUpdateManyWithWhereWithoutColectivoInput[]
    deleteMany?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTareasInput = {
    create?: XOR<UserCreateWithoutTareasInput, UserUncheckedCreateWithoutTareasInput>
    connectOrCreate?: UserCreateOrConnectWithoutTareasInput
    connect?: UserWhereUniqueInput
  }

  export type EnumestadoTareaFieldUpdateOperationsInput = {
    set?: $Enums.estadoTarea
  }

  export type UserUpdateOneRequiredWithoutTareasNestedInput = {
    create?: XOR<UserCreateWithoutTareasInput, UserUncheckedCreateWithoutTareasInput>
    connectOrCreate?: UserCreateOrConnectWithoutTareasInput
    upsert?: UserUpsertWithoutTareasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTareasInput, UserUpdateWithoutTareasInput>, UserUncheckedUpdateWithoutTareasInput>
  }

  export type ColectivoCreateNestedOneWithoutProfesoresInput = {
    create?: XOR<ColectivoCreateWithoutProfesoresInput, ColectivoUncheckedCreateWithoutProfesoresInput>
    connectOrCreate?: ColectivoCreateOrConnectWithoutProfesoresInput
    connect?: ColectivoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutColectivosInput = {
    create?: XOR<UserCreateWithoutColectivosInput, UserUncheckedCreateWithoutColectivosInput>
    connectOrCreate?: UserCreateOrConnectWithoutColectivosInput
    connect?: UserWhereUniqueInput
  }

  export type ColectivoUpdateOneRequiredWithoutProfesoresNestedInput = {
    create?: XOR<ColectivoCreateWithoutProfesoresInput, ColectivoUncheckedCreateWithoutProfesoresInput>
    connectOrCreate?: ColectivoCreateOrConnectWithoutProfesoresInput
    upsert?: ColectivoUpsertWithoutProfesoresInput
    connect?: ColectivoWhereUniqueInput
    update?: XOR<XOR<ColectivoUpdateToOneWithWhereWithoutProfesoresInput, ColectivoUpdateWithoutProfesoresInput>, ColectivoUncheckedUpdateWithoutProfesoresInput>
  }

  export type UserUpdateOneRequiredWithoutColectivosNestedInput = {
    create?: XOR<UserCreateWithoutColectivosInput, UserUncheckedCreateWithoutColectivosInput>
    connectOrCreate?: UserCreateOrConnectWithoutColectivosInput
    upsert?: UserUpsertWithoutColectivosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutColectivosInput, UserUpdateWithoutColectivosInput>, UserUncheckedUpdateWithoutColectivosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRolFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolFilter<$PrismaModel> | $Enums.Rol
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Rol | EnumRolFieldRefInput<$PrismaModel>
    in?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Rol[] | ListEnumRolFieldRefInput<$PrismaModel>
    not?: NestedEnumRolWithAggregatesFilter<$PrismaModel> | $Enums.Rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRolFilter<$PrismaModel>
    _max?: NestedEnumRolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumModalidadFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | EnumModalidadFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadFilter<$PrismaModel> | $Enums.Modalidad
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumModalidadWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modalidad | EnumModalidadFieldRefInput<$PrismaModel>
    in?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modalidad[] | ListEnumModalidadFieldRefInput<$PrismaModel>
    not?: NestedEnumModalidadWithAggregatesFilter<$PrismaModel> | $Enums.Modalidad
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalidadFilter<$PrismaModel>
    _max?: NestedEnumModalidadFilter<$PrismaModel>
  }

  export type NestedEnumestadoTareaFilter<$PrismaModel = never> = {
    equals?: $Enums.estadoTarea | EnumestadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumestadoTareaFilter<$PrismaModel> | $Enums.estadoTarea
  }

  export type NestedEnumestadoTareaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.estadoTarea | EnumestadoTareaFieldRefInput<$PrismaModel>
    in?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    notIn?: $Enums.estadoTarea[] | ListEnumestadoTareaFieldRefInput<$PrismaModel>
    not?: NestedEnumestadoTareaWithAggregatesFilter<$PrismaModel> | $Enums.estadoTarea
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumestadoTareaFilter<$PrismaModel>
    _max?: NestedEnumestadoTareaFilter<$PrismaModel>
  }

  export type ColectivoProfesorCreateWithoutProfesorInput = {
    asignatura: string
    createdAt?: Date | string
    colectivo: ColectivoCreateNestedOneWithoutProfesoresInput
  }

  export type ColectivoProfesorUncheckedCreateWithoutProfesorInput = {
    colectivoId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type ColectivoProfesorCreateOrConnectWithoutProfesorInput = {
    where: ColectivoProfesorWhereUniqueInput
    create: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput>
  }

  export type ColectivoProfesorCreateManyProfesorInputEnvelope = {
    data: ColectivoProfesorCreateManyProfesorInput | ColectivoProfesorCreateManyProfesorInput[]
    skipDuplicates?: boolean
  }

  export type TareaCreateWithoutProfesorInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
  }

  export type TareaUncheckedCreateWithoutProfesorInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
  }

  export type TareaCreateOrConnectWithoutProfesorInput = {
    where: TareaWhereUniqueInput
    create: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput>
  }

  export type TareaCreateManyProfesorInputEnvelope = {
    data: TareaCreateManyProfesorInput | TareaCreateManyProfesorInput[]
    skipDuplicates?: boolean
  }

  export type ColectivoProfesorUpsertWithWhereUniqueWithoutProfesorInput = {
    where: ColectivoProfesorWhereUniqueInput
    update: XOR<ColectivoProfesorUpdateWithoutProfesorInput, ColectivoProfesorUncheckedUpdateWithoutProfesorInput>
    create: XOR<ColectivoProfesorCreateWithoutProfesorInput, ColectivoProfesorUncheckedCreateWithoutProfesorInput>
  }

  export type ColectivoProfesorUpdateWithWhereUniqueWithoutProfesorInput = {
    where: ColectivoProfesorWhereUniqueInput
    data: XOR<ColectivoProfesorUpdateWithoutProfesorInput, ColectivoProfesorUncheckedUpdateWithoutProfesorInput>
  }

  export type ColectivoProfesorUpdateManyWithWhereWithoutProfesorInput = {
    where: ColectivoProfesorScalarWhereInput
    data: XOR<ColectivoProfesorUpdateManyMutationInput, ColectivoProfesorUncheckedUpdateManyWithoutProfesorInput>
  }

  export type ColectivoProfesorScalarWhereInput = {
    AND?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
    OR?: ColectivoProfesorScalarWhereInput[]
    NOT?: ColectivoProfesorScalarWhereInput | ColectivoProfesorScalarWhereInput[]
    colectivoId?: StringFilter<"ColectivoProfesor"> | string
    userId?: StringFilter<"ColectivoProfesor"> | string
    asignatura?: StringFilter<"ColectivoProfesor"> | string
    createdAt?: DateTimeFilter<"ColectivoProfesor"> | Date | string
  }

  export type TareaUpsertWithWhereUniqueWithoutProfesorInput = {
    where: TareaWhereUniqueInput
    update: XOR<TareaUpdateWithoutProfesorInput, TareaUncheckedUpdateWithoutProfesorInput>
    create: XOR<TareaCreateWithoutProfesorInput, TareaUncheckedCreateWithoutProfesorInput>
  }

  export type TareaUpdateWithWhereUniqueWithoutProfesorInput = {
    where: TareaWhereUniqueInput
    data: XOR<TareaUpdateWithoutProfesorInput, TareaUncheckedUpdateWithoutProfesorInput>
  }

  export type TareaUpdateManyWithWhereWithoutProfesorInput = {
    where: TareaScalarWhereInput
    data: XOR<TareaUpdateManyMutationInput, TareaUncheckedUpdateManyWithoutProfesorInput>
  }

  export type TareaScalarWhereInput = {
    AND?: TareaScalarWhereInput | TareaScalarWhereInput[]
    OR?: TareaScalarWhereInput[]
    NOT?: TareaScalarWhereInput | TareaScalarWhereInput[]
    tareaId?: StringFilter<"Tarea"> | string
    nombreTarea?: StringFilter<"Tarea"> | string
    descripcion?: StringFilter<"Tarea"> | string
    fechaLimite?: DateTimeFilter<"Tarea"> | Date | string
    estado?: EnumestadoTareaFilter<"Tarea"> | $Enums.estadoTarea
    userId?: StringFilter<"Tarea"> | string
  }

  export type ColectivoProfesorCreateWithoutColectivoInput = {
    asignatura: string
    createdAt?: Date | string
    profesor: UserCreateNestedOneWithoutColectivosInput
  }

  export type ColectivoProfesorUncheckedCreateWithoutColectivoInput = {
    userId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type ColectivoProfesorCreateOrConnectWithoutColectivoInput = {
    where: ColectivoProfesorWhereUniqueInput
    create: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput>
  }

  export type ColectivoProfesorCreateManyColectivoInputEnvelope = {
    data: ColectivoProfesorCreateManyColectivoInput | ColectivoProfesorCreateManyColectivoInput[]
    skipDuplicates?: boolean
  }

  export type ColectivoProfesorUpsertWithWhereUniqueWithoutColectivoInput = {
    where: ColectivoProfesorWhereUniqueInput
    update: XOR<ColectivoProfesorUpdateWithoutColectivoInput, ColectivoProfesorUncheckedUpdateWithoutColectivoInput>
    create: XOR<ColectivoProfesorCreateWithoutColectivoInput, ColectivoProfesorUncheckedCreateWithoutColectivoInput>
  }

  export type ColectivoProfesorUpdateWithWhereUniqueWithoutColectivoInput = {
    where: ColectivoProfesorWhereUniqueInput
    data: XOR<ColectivoProfesorUpdateWithoutColectivoInput, ColectivoProfesorUncheckedUpdateWithoutColectivoInput>
  }

  export type ColectivoProfesorUpdateManyWithWhereWithoutColectivoInput = {
    where: ColectivoProfesorScalarWhereInput
    data: XOR<ColectivoProfesorUpdateManyMutationInput, ColectivoProfesorUncheckedUpdateManyWithoutColectivoInput>
  }

  export type UserCreateWithoutTareasInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    colectivos?: ColectivoProfesorCreateNestedManyWithoutProfesorInput
  }

  export type UserUncheckedCreateWithoutTareasInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    colectivos?: ColectivoProfesorUncheckedCreateNestedManyWithoutProfesorInput
  }

  export type UserCreateOrConnectWithoutTareasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTareasInput, UserUncheckedCreateWithoutTareasInput>
  }

  export type UserUpsertWithoutTareasInput = {
    update: XOR<UserUpdateWithoutTareasInput, UserUncheckedUpdateWithoutTareasInput>
    create: XOR<UserCreateWithoutTareasInput, UserUncheckedCreateWithoutTareasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTareasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTareasInput, UserUncheckedUpdateWithoutTareasInput>
  }

  export type UserUpdateWithoutTareasInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivos?: ColectivoProfesorUpdateManyWithoutProfesorNestedInput
  }

  export type UserUncheckedUpdateWithoutTareasInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivos?: ColectivoProfesorUncheckedUpdateManyWithoutProfesorNestedInput
  }

  export type ColectivoCreateWithoutProfesoresInput = {
    colectivoId?: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt?: Date | string
  }

  export type ColectivoUncheckedCreateWithoutProfesoresInput = {
    colectivoId?: string
    nombreColectivo: string
    year: number
    modalidad: $Enums.Modalidad
    createdAt?: Date | string
  }

  export type ColectivoCreateOrConnectWithoutProfesoresInput = {
    where: ColectivoWhereUniqueInput
    create: XOR<ColectivoCreateWithoutProfesoresInput, ColectivoUncheckedCreateWithoutProfesoresInput>
  }

  export type UserCreateWithoutColectivosInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    tareas?: TareaCreateNestedManyWithoutProfesorInput
  }

  export type UserUncheckedCreateWithoutColectivosInput = {
    userId?: string
    userName: string
    password?: string | null
    rol: $Enums.Rol
    apellido: string
    createdAt?: Date | string
    tareas?: TareaUncheckedCreateNestedManyWithoutProfesorInput
  }

  export type UserCreateOrConnectWithoutColectivosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutColectivosInput, UserUncheckedCreateWithoutColectivosInput>
  }

  export type ColectivoUpsertWithoutProfesoresInput = {
    update: XOR<ColectivoUpdateWithoutProfesoresInput, ColectivoUncheckedUpdateWithoutProfesoresInput>
    create: XOR<ColectivoCreateWithoutProfesoresInput, ColectivoUncheckedCreateWithoutProfesoresInput>
    where?: ColectivoWhereInput
  }

  export type ColectivoUpdateToOneWithWhereWithoutProfesoresInput = {
    where?: ColectivoWhereInput
    data: XOR<ColectivoUpdateWithoutProfesoresInput, ColectivoUncheckedUpdateWithoutProfesoresInput>
  }

  export type ColectivoUpdateWithoutProfesoresInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoUncheckedUpdateWithoutProfesoresInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    nombreColectivo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    modalidad?: EnumModalidadFieldUpdateOperationsInput | $Enums.Modalidad
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutColectivosInput = {
    update: XOR<UserUpdateWithoutColectivosInput, UserUncheckedUpdateWithoutColectivosInput>
    create: XOR<UserCreateWithoutColectivosInput, UserUncheckedCreateWithoutColectivosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutColectivosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutColectivosInput, UserUncheckedUpdateWithoutColectivosInput>
  }

  export type UserUpdateWithoutColectivosInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareas?: TareaUpdateManyWithoutProfesorNestedInput
  }

  export type UserUncheckedUpdateWithoutColectivosInput = {
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    rol?: EnumRolFieldUpdateOperationsInput | $Enums.Rol
    apellido?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tareas?: TareaUncheckedUpdateManyWithoutProfesorNestedInput
  }

  export type ColectivoProfesorCreateManyProfesorInput = {
    colectivoId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type TareaCreateManyProfesorInput = {
    tareaId?: string
    nombreTarea: string
    descripcion: string
    fechaLimite: Date | string
    estado: $Enums.estadoTarea
  }

  export type ColectivoProfesorUpdateWithoutProfesorInput = {
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    colectivo?: ColectivoUpdateOneRequiredWithoutProfesoresNestedInput
  }

  export type ColectivoProfesorUncheckedUpdateWithoutProfesorInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoProfesorUncheckedUpdateManyWithoutProfesorInput = {
    colectivoId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TareaUpdateWithoutProfesorInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
  }

  export type TareaUncheckedUpdateWithoutProfesorInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
  }

  export type TareaUncheckedUpdateManyWithoutProfesorInput = {
    tareaId?: StringFieldUpdateOperationsInput | string
    nombreTarea?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    fechaLimite?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumestadoTareaFieldUpdateOperationsInput | $Enums.estadoTarea
  }

  export type ColectivoProfesorCreateManyColectivoInput = {
    userId: string
    asignatura: string
    createdAt?: Date | string
  }

  export type ColectivoProfesorUpdateWithoutColectivoInput = {
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profesor?: UserUpdateOneRequiredWithoutColectivosNestedInput
  }

  export type ColectivoProfesorUncheckedUpdateWithoutColectivoInput = {
    userId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColectivoProfesorUncheckedUpdateManyWithoutColectivoInput = {
    userId?: StringFieldUpdateOperationsInput | string
    asignatura?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}