CREATE PROCEDURE GetGroupDetailsAndUsers(IN inputGroupId INT)
BEGIN
  SELECT JSON_OBJECT(
    'groupDetails', (
      SELECT JSON_OBJECT(
        'id', mg.id,
        'name', mg.name,
        'description', mg.description,
        'createdAt', mg.createdAt,
        'updatedAt', mg.updatedAt
      )
      FROM master_groups mg
      WHERE mg.id = inputGroupId
    ),
    'groupUsers', (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', mu.id,
          'name', mu.name,
          'email', mu.email
        )
      )
      FROM master_user_groups mug
      INNER JOIN master_users mu ON mug.userId = mu.id
      WHERE mug.groupId = inputGroupId
    )
  ) AS finalJson;
END