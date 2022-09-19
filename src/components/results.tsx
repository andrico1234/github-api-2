import React from "react";
import { useNavigation } from "react-router-dom";
import { SearchResults } from "../types/searchResults";

interface Props {
  users: SearchResults["items"];
}

export function Results(props: Props) {
  const { users } = props;
  const navigation = useNavigation();

  return (
    <ul className="resultsList">
      {users.map((user) => {
        return (
          <li className="result" key={user.id} data-state={navigation.state}>
            <a href={user.html_url}>
              <div className="avatarContainer">
                <img
                  className="avatar"
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                />
              </div>
              <div>
                <div className="nameContainer">
                  {user.name}
                  <span className="userLogin">{user.login}</span>
                </div>
                <div>Followers: {user.followers}</div>
                <div>Bio: {user.bio ?? "-"}</div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
