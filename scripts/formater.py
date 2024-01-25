

class formater:
    def __init__(self):
        pass

    def format_link(self, links):
        data = []
        for link in links:
            data.append({
                "id": link[0],
                "link_nb": link[1],
                "area_block_id": link[2],
                "action_id": link[3],
                "reaction_id": link[4],
                "user_id": link[5],
                "time_check": link[6],
                "is_active": link[7],
                "params_for_action": link[8],
                "params_for_reaction": link[9]
            })
        return data

    def format_area(self, areas):
        data = []
        for area in areas:
            data.append({
                "id": area[0],
                "name": area[1],
                "description": area[2],
                "nb_user_input": area[3],
            })
        return data

    def format_area_steps(self, area_steps):
        data = []
        for area_step in area_steps:
            data.append({
                "id": area_step[0],
                "area_id": area_step[1],
                "step_nb": area_step[2],
                "type": area_step[3],
                "method": area_step[4],
                "url": area_step[5],
                "body": area_step[6],
                "headers": area_step[7],
                "transformation_function": area_step[8],
                "transformation_params": area_step[9],
            })
        return data

    def format_token_infos(self, token_infos):
        data = []
        for token_info in token_infos:
            data.append({
                "id": token_info[0],
                "user_id": token_info[1],
                "data": token_info[2],
                "token": token_info[3],
                "refresh_token": token_info[4],
                "expires_in": token_info[5],
                "infos_for": token_info[6],
            })
        return data
