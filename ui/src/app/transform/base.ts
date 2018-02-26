export abstract class BaseMapper<TSource, TDestination> {
  public abstract map(source: TSource): TDestination;
}
