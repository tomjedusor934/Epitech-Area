import 'reactflow/dist/style.css';
import './create_area.css';

import React, { useCallback, useState, useEffect, useDebugValue } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';

import Essence from '../../components/puzzle_box/Action/essence/essence';
import Meteo from '../../components/puzzle_box/Action/meteo/meteo';
import Notifs from '../../components/puzzle_box/Reaction/notification/notifs';
import Translate from '../../components/puzzle_box/Transformation/translate/translate';
import Basic_action from '../../components/puzzle_box/Action/basic_action/basic_action';
import Basic_reaction from '../../components/puzzle_box/Reaction/basic_reaction/basic_reaction';
import Basic_transformation from '../../components/puzzle_box/Transformation/basic_transformation/basic_transformation';

export default function Create_area(props) {
    const initialNodes = [];
    const initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const [isValidate, setIsValidate] = useState('neutre');

    const [blueprintsList, setBlueprintsList] = useState([]);

    const [infoPrblm, setInfoPrblm] = useState([]);
    const [openPrblm, setOpenPrblm] = useState(false);

    const [searchText, setSearchText] = useState('');

    const filterBlueprintsList = () => {
        return blueprintsList.filter((blueprint) => {
            return blueprint.name.toLowerCase().includes(searchText.toLowerCase());
        });
    };


    const handleValidate = () => {
        setIsValidate('true');
    }

    const handleNeutral = () => {
        setIsValidate('neutre');
    }

    const handleInvalid = () => {
        setIsValidate('false');
    }

    const handleConnect = useCallback((params) => {
        setEdges((eds) => {
            const updatedEdges = addEdge(params, eds);
            updateLocalStorageEdges(updatedEdges);
            return updatedEdges;
        });
    }, [setEdges]);


    const updateLocalStorageEdges = (updatedEdges) => {
        const storedArray = JSON.parse(localStorage.getItem('myArray'));

        storedArray[0] = updatedEdges;

        localStorage.setItem('myArray', JSON.stringify(storedArray));

        setMyArray(storedArray);
    };

    const deleteEdges = (id, edgesToFilter) => {
        const updatedEdges = edgesToFilter.filter((edge) => edge.id !== id);
        updateLocalStorageEdges(updatedEdges); // Met à jour le localStorage avec les edges filtrées
        return updatedEdges;
    };

    const [myArray, setMyArray] = useState([]);

    const updateArray = (newArray) => {
        setMyArray(newArray);
        localStorage.setItem('myArray', JSON.stringify(newArray));
    };

    const addItemToArray = (item) => {
        const storedArray = JSON.parse(localStorage.getItem('myArray'));

        if (storedArray === null || storedArray === undefined) {
            const defaultArray = [];
            updateArray([...defaultArray, item]);
            return;
        }

        const updatedArray = [...storedArray, item];
        updateArray(updatedArray);
    };


    const removeItemFromArray = (index) => {
        const updatedArray = [...myArray];
        updatedArray.splice(index, 1);

        updateArray(updatedArray);
    };

    const addNode = (position, content, type, configuration) => {
        const newNode = {
            id: String(nodes.length + 1),
            id_blueprint: configuration.id_blueprint,
            position,
            data: { label: content },
            type: type,
            style: {
                background: 'rgb(245, 245, 245)',
                color: '#000',
                border: '1px solid rgb(245, 245, 245)',
                width: 300,
                height: 330,
                borderRadius: 50,
            },
            sourcePosition: 'right',
            targetPosition: 'left',
            configuration: configuration
        };

        let newItem = [];

        if (configuration.name === "Translate") {
            newItem = {
                id: newNode.id,
                id_blueprint: configuration.id_blueprint,
                name: "Translate",
                langue: "",
                type: type,
            }
        } else {
            newItem = {
                id: newNode.id,
                id_blueprint: configuration.id_blueprint,
                name: configuration.name,
                type: type,
                params: [],
            }
        }

        addItemToArray(newItem);
        setMenuIsOpen(false);
        setNodes([...nodes, newNode]);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setMenuIsOpen(true);
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'z') {
            const maxNodeId = Math.max(...nodes.map((node) => parseInt(node.id, 10)));

            let isNodeUsedInEdges = false;

            // Vérifier si l'ID du nœud à supprimer est utilisé dans les arêtes
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].source == maxNodeId.toString() || edges[i].target == maxNodeId.toString()) {
                    isNodeUsedInEdges = true;
                    break;
                }
            }

            if (isNodeUsedInEdges) {
                alert("Vous ne pouvez pas supprimer ce nœud car il est lié à d'autres éléments. Supprimez d'abord les liaisons.");
                return;
            }

            const newNodes = nodes.filter((node) => node.id !== maxNodeId.toString());
            setNodes(newNodes);

            // Mettre à jour le tableau des edges dans le localStorage en supprimant le dernier élément
            let maxArrayId = 0;

            const storedArray = JSON.parse(localStorage.getItem('myArray'));

            console.log("taille: ", storedArray.length);

            if (Array.isArray(storedArray) && storedArray.length > 0) {
                const lastElement = storedArray[storedArray.length - 1];

                maxArrayId = lastElement.id;

                console.log('ID du dernier élément :', maxArrayId);
            } else {
                console.log('Le tableau est vide ou n\'existe pas.');
            }

            if (maxArrayId >= 1) {
                removeItemFromArray(maxArrayId);
            }

            // if (storedArray && Array.isArray(storedArray[0])) {
            //     localStorage.setItem('myArray', JSON.stringify(newArray));
            // }
        }
    };

    const vérifierConnexions = (myArray) => {

        if (myArray.length === 1) {
            return;
        }

        const connections = myArray[0]; // Récupérez les connexions depuis la première case
        const nodes = myArray.slice(1); // Récupérez les éléments de la case 1 et suivantes
        const nodeMap = new Map();
        let aDesProblemes = false; // Variable pour vérifier s'il y a des problèmes

        // Créez une carte pour mapper les nœuds par ID pour un accès plus facile
        nodes.forEach(node => {
            nodeMap.set(node.id, node);
        });

        if (myArray[0].length === 0) {
            // alert("Vous n'avez pas de connexion.");
            setInfoPrblm(...infoPrblm, "Vous n'avez pas de connexion.");
            aDesProblemes = true;
        }

        // Vérifiez si tous les éléments "default" ont un input et un output liés
        nodes.forEach(node => {
            if (node.type === "default") {
                const inputConnected = connections.some(connection => connection.target === node.id);
                const outputConnected = connections.some(connection => connection.source === node.id);

                if (!inputConnected || !outputConnected) {
                    // alert(`Le nœud "default" "${node.name}" (${node.id}) doit avoir à la fois un input et un output liés.`);
                    setInfoPrblm([...infoPrblm, `Le nœud "default" "${node.name}" (${node.id}) doit avoir à la fois un input et un output liés.`]);
                    aDesProblemes = true;
                }
            }

            // Vérifiez si tous les éléments "input" ont un output lié

            if (node.type === "input") {
                const outputConnected = connections.some(connection => connection.source === node.id);

                if (!outputConnected) {
                    // alert(`Le nœud "input" "${node.name}" (${node.id}) doit avoir un output lié.`);
                    setInfoPrblm([...infoPrblm, `Le nœud "input" "${node.name}" (${node.id}) doit avoir un output lié.`]);
                    aDesProblemes = true;
                }
            }

            // Vérifiez si tous les éléments "output" ont un input lié

            if (node.type === "output") {
                const inputConnected = connections.some(connection => connection.target === node.id);

                if (!inputConnected) {
                    // alert(`Le nœud "output" "${node.name}" (${node.id}) doit avoir un input lié.`);
                    setInfoPrblm([...infoPrblm, `Le nœud "output" "${node.name}" (${node.id}) doit avoir un input lié.`]);
                    aDesProblemes = true;
                }
            }
        });

        // Parcourez les connexions et vérifiez chaque connexion
        for (let i = 0; i < connections.length; i++) {
            const connection = connections[i];

            const sourceNode = nodeMap.get(connection.source);
            const targetNode = nodeMap.get(connection.target);

            if (!sourceNode) {
                // alert(`La source "${connection.source}" n'existe pas.`);
                setInfoPrblm([...infoPrblm, `La source "${connection.source}" n'existe pas.`]);
                aDesProblemes = true;
                continue;
            }

            if (!targetNode) {
                // alert(`La cible "${connection.target}" n'existe pas.`);
                setInfoPrblm([...infoPrblm, `La cible "${connection.target}" n'existe pas.`]);
                aDesProblemes = true;
                continue;
            }

            // Vérifiez si le type du nœud source est "input" ou "default"
            if (sourceNode.type !== "input" && sourceNode.type !== "default") {
                // alert(`Le nœud source "${sourceNode.name}" (${sourceNode.id}) n'est pas un input ou un default.`);
                setInfoPrblm([...infoPrblm, `Le nœud source "${sourceNode.name}" (${sourceNode.id}) n'est pas un input ou un default.`]);
                aDesProblemes = true;
            }

            // Vérifiez si le type du nœud cible est "output" ou "default"
            if (targetNode.type !== "output" && targetNode.type !== "default") {
                // alert(`Le nœud cible "${targetNode.name}" (${targetNode.id}) n'est pas un output ou un default.`);
                setInfoPrblm([...infoPrblm, `Le nœud cible "${targetNode.name}" (${targetNode.id}) n'est pas un output ou un default.`]);
                aDesProblemes = true;
            }
        }

        if (!aDesProblemes) {
            handleValidate();
            checkLang();
        } else {
            // alert("Connexions invalides.");
            setOpenPrblm(true);
            handleInvalid();
        }
    }

    const checkLang = () => {
        let updateArray = localStorage.getItem('myArray');
        updateArray = JSON.parse(updateArray);

        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].name === "Translate") {
                if (updateArray[i].langue === "") {
                    alert("Vous devez sélectionner une langue pour la traduction.");
                    setIsValidate('false');
                    return false;
                }
            }
        }
    }

    const transformTabParamsToString = (tab) => {
        let string = "";

        for (let i = 0; i < tab.length; i++) {

            let input = 'input' + (i + 1).toString();

            string += input;
            string += ':';
            string += tab[i];

            if (i !== tab.length - 1) {
                string += ', ';
            }
        }

        return string;
    }

    const getReactionIdFromEdge = (edgeTab, id_action) => {
        let tmp_reaction_id = 0;

        for (let i = 0; i < edgeTab.length; i++) {
            if (edgeTab[i].source == id_action) {
                return edgeTab[i].target;
            }
        }

        return tmp_reaction_id;
    }

    const getReactionIdBlueprint = (reaction_id, getFinalArray) => {
        for (let i = 1; i < getFinalArray.length ; i++) {
            if (getFinalArray[i].id == reaction_id) {
                return getFinalArray[i].id_blueprint;
            }
        }
    }

    const getParamsFromReactionId = (reaction_id, getFinalArray) => {
        for (let i = 1; i < getFinalArray.length ; i++) {
            if (getFinalArray[i].id == reaction_id) {
                return getFinalArray[i].params;
            }
        }
    }

    const fetchAreaToCreate = async () => {
        const getFinalArray = JSON.parse(localStorage.getItem('myArray'));

        let last_block_id = 0;
        let user_id_tmp = localStorage.getItem('id');
        let edgeTab = getFinalArray[0];
        let finalArray = [];

        try {
            const response = await fetch(`https://api.area.tal-web.com/area/last_block_id/${user_id_tmp}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            });
            const data = await response.json();

            last_block_id = data;

            console.log("getFinalArray: ", getFinalArray);

            for (let i = 1; i < getFinalArray.length - 1; i++) {
                let link_nb = i - 1;
                let area_block_id = last_block_id + 1;
                let action_id = getFinalArray[i].id_blueprint;
                let reaction_id = getReactionIdBlueprint(getReactionIdFromEdge(edgeTab, getFinalArray[i].id), getFinalArray);
                let user_id = user_id_tmp;
                let time_check = "every 5 minutes";
                let is_active = 1;
                let params_for_action = transformTabParamsToString(getFinalArray[i].params);
                let params_for_reaction = transformTabParamsToString(getParamsFromReactionId(getReactionIdFromEdge(edgeTab, getFinalArray[i].id), getFinalArray));

                let tab = {
                    link_nb: link_nb,
                    area_block_id: area_block_id,
                    action_id: action_id,
                    reaction_id: reaction_id,
                    user_id: user_id,
                    time_check: time_check,
                    is_active: is_active,
                    params_for_action: params_for_action,
                    params_for_reaction: params_for_reaction,
                }

                finalArray.push(tab);
            }

        } catch (error) {
            console.error(error);
        }

        console.log("finalArray: ", finalArray);

        if (finalArray.length !== getFinalArray.length - 2) {
            alert("Rechargez la page et réessayez.");
            return;
        }

        if (finalArray.length !== 0) {
            finalArray.forEach((element) => {
                fetch('https://api.area.tal-web.com/area/link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                    body: JSON.stringify(element),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }

        alert("Votre area a bien été créée.");
        localStorage.removeItem('myArray');
        setMyArray([[]]);
        setNodes([]);
        setEdges([]);
        props.editState("create");
    }


    useEffect(() => {
        //get all blueprint
        fetch('https://api.area.tal-web.com/area/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setBlueprintsList(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        handleNeutral();
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nodes]);

    useEffect(() => {
        const storedArray = localStorage.getItem('myArray');

        if (storedArray) {
            setMyArray(JSON.parse(storedArray));
        }
    }, []);

    useEffect(() => {
        addItemToArray(edges);
        updateLocalStorageEdges(edges);
    }, []);

    return (
        <div className='create_area_container'>

            {
                openPrblm ? (
                    <div className='problemes_container'>
                        <div className='problemes'>
                            <div className='flex'>
                                <div
                                    onClick={() => {
                                        setOpenPrblm(false);
                                        setInfoPrblm([]);
                                    }}
                                >
                                    <AiOutlineCloseCircle
                                        size={30}
                                        style={{
                                            color: 'red',
                                        }}
                                    />
                                </div>
                                <h1>
                                    Problèmes
                                </h1>
                            </div>


                            <div className='prblm_list'>
                                {
                                    infoPrblm.map((prblm, index) => (
                                        <div className='prblm_item'>
                                            <p>
                                                {prblm}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                            <h5>
                                En cas de problème, veuillez vous rendre sur la documentation: <a href="https://www.notion.so/Doc-blueprint-3d52ea15a8394cc98d64d5efa02b0c64">documentation</a>
                            </h5>
                        </div>

                    </div>
                ) : (
                    <div></div>
                )
            }

            <div className='head_create_reactflow'>
                <div className='flex'>
                    <div onClick={() => props.editState("create")}>
                        <AiOutlineLeft size={30} />
                    </div>
                    <h1>Création</h1>
                </div>

                <div
                    className='liste_button_create'
                >
                    <button
                        onClick={() => {
                            localStorage.removeItem('myArray');
                            setMyArray([[]]);
                            setNodes([]);
                            setEdges([]);
                            addItemToArray(edges);
                            updateLocalStorageEdges(edges);
                        }}
                        className='grey'
                    >
                        Réinitialiser
                    </button>

                    <button
                        onClick={() => vérifierConnexions(myArray)}
                        className='grey'
                    >
                        Vérifier
                    </button>

                    <button
                        onClick={
                            () => fetchAreaToCreate()
                        }
                    >
                        Enregistrer
                    </button>

                    {
                        isValidate === 'false' ? (
                            <div className='flex'>
                                <AiOutlineCloseCircle
                                    size={50}
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            </div>
                        ) : (
                            isValidate === 'true' ? (
                                <div className='flex'>
                                    <BsCheckLg
                                        size={50}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'rgb(0, 193, 0)',
                                            borderRadius: 50,
                                            padding: 5,
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className='flex'>
                                    <AiFillMinusCircle
                                        size={50}
                                        style={{
                                            color: 'rgb(140, 140, 140)',
                                        }}
                                    />
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className='background_reactflow' onContextMenu={handleContextMenu}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={handleConnect}
                    onEdgeClick={(event, edge) => {
                        const newEdges = deleteEdges(edge.id, edges);
                        setEdges(newEdges);
                    }}
                    onClick={() => setMenuIsOpen(false)}
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={20} size={1} />
                </ReactFlow>

                {menuIsOpen && (
                    <div
                        className='context-menu'
                        style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }}
                    >
                        <MenuItems addNode={addNode} blueprintsList={blueprintsList} nodes={nodes} filterBlueprintsList={filterBlueprintsList} />
                    </div>
                )}
            </div>
        </div>
    );
}

function MenuItems({ addNode, blueprintsList, nodes, filterBlueprintsList }) {
    const handleAddNode = (position, content, type, configuration) => {
        addNode(position, content, type, configuration);
    };

    const filteredBlueprints = filterBlueprintsList();

    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubMenuClick = (subMenuIndex) => {
        if (activeSubMenu === subMenuIndex) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(subMenuIndex);
        }
    };

    const menuItems = [
        { label: "Température", type: "Action", component: <Meteo /> },
        { label: "Essence", type: "Action", component: <Essence /> },
        { label: "Météo", type: "Action", component: <Meteo /> },
        { label: "Notifications", type: "Reaction", component: <Notifs /> },
        { label: "Traduction", type: "Transform", component: <Translate /> },
    ];

    const filteredItems = menuItems.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className='menu'>

            <input type="text" placeholder="Rechercher" value={searchText} onChange={handleSearchTextChange} />
            {
                searchText === '' ? (
                    <div>
                        <ul className="dropdown-menu">
                            <li onClick={() => handleSubMenuClick(1)}>
                                Action

                                <AiOutlineRight
                                    style={{
                                        position: 'relative',
                                        top: 5,
                                    }}
                                />
                            </li>

                            <li onClick={() => handleSubMenuClick(2)}>
                                Reaction

                                <AiOutlineRight
                                    style={{
                                        position: 'relative',
                                        top: 5,
                                    }}
                                />
                            </li>

                            <li onClick={() => handleSubMenuClick(3)}>
                                Transformation

                                <AiOutlineRight
                                    style={{
                                        position: 'relative',
                                        top: 5,
                                    }}
                                />
                            </li>
                        </ul>
                        {(activeSubMenu !== null) && (
                            <div className="submenu-container">
                                {activeSubMenu === 1 && (
                                    <ul className="submenu">
                                        <h3>
                                            Action
                                        </h3>
                                        {
                                            blueprintsList.map((blueprint, index) => (
                                                blueprint.common_type === "action" ? (
                                                    <li key={index} onClick={(e) => handleAddNode
                                                        (
                                                            { x: e.clientX - 500, y: e.clientY - 300 },
                                                            <Basic_action name={blueprint.name} description={blueprint.description} nb_params={blueprint.nb_user_input} id_node={nodes.length + 1} />,
                                                            'input',
                                                            {
                                                                name: blueprint.name,
                                                                type: blueprint.common_type,
                                                                id_blueprint: blueprint.id
                                                            }
                                                        )
                                                    }>
                                                        {blueprint.name}
                                                    </li>
                                                ) : (
                                                    <div></div>
                                                )
                                            ))
                                        }
                                    </ul>
                                )}

                                {activeSubMenu === 2 && (
                                    <ul className="submenu">
                                        <h3>
                                            Réaction
                                        </h3>
                                        {
                                            blueprintsList.map((blueprint, index) => (
                                                blueprint.common_type === "reaction" ? (
                                                    <li key={index} onClick={(e) => handleAddNode({ x: e.clientX - 500, y: e.clientY - 300 }, <Basic_reaction name={blueprint.name} description={blueprint.description} nb_params={blueprint.nb_user_input} id_node={nodes.length + 1} />, 'output', { name: blueprint.name, type: blueprint.common_type, id_blueprint: blueprint.id })}>
                                                        {blueprint.name}
                                                    </li>
                                                ) : (
                                                    <div></div>
                                                )
                                            ))
                                        }
                                    </ul>
                                )}

                                {activeSubMenu === 3 && (
                                    <ul className="submenu">
                                        <h3>
                                            Transformaion
                                        </h3>
                                        {
                                            blueprintsList.map((blueprint, index) => (
                                                blueprint.common_type === "transformation" ? (
                                                    <li key={index} onClick={(e) => handleAddNode({ x: e.clientX - 500, y: e.clientY - 300 }, <Basic_transformation name={blueprint.name} description={blueprint.description} nb_params={blueprint.nb_user_input} id_node={nodes.length + 1} />, 'default', { name: blueprint.name, type: blueprint.common_type, id_blueprint: blueprint.id })}>
                                                        {blueprint.name}
                                                    </li>
                                                ) : (
                                                    <div></div>
                                                )
                                            ))
                                        }
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <ul className="searchMenu">
                            {filteredBlueprints.map((blueprint, index) => (
                                <li
                                    key={index}
                                    onClick={(e) =>
                                        handleAddNode(
                                            { x: e.clientX - 500, y: e.clientY - 300 },
                                            <Basic_action
                                                name={blueprint.name}
                                                description={blueprint.description}
                                                nb_params={blueprint.nb_user_input}
                                            />,
                                            'input',
                                            { name: blueprint.name, type: blueprint.common_type }
                                        )
                                    }
                                >
                                    {blueprint.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}
