CREATE MIGRATION m16sux4yvgzw6f7swkegbgat2b5qq7ofe6dl3sclkwywjjejwc533q
    ONTO m1gln7g5gad6act636se3wwckizzrk4bcs3yzm6oyu7h3nhqpldjxq
{
  ALTER TYPE default::Page {
      CREATE PROPERTY isPublic := (((std::count(default::Page.conditions) = 0) OR std::all((default::Page.conditions.conditionType = default::AccessConditionType.None))));
  };
};
