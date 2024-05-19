package cz.truchjan.unicorn.controller;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.Link;
import cz.truchjan.unicorn.service.LinkService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/link")
@AllArgsConstructor
@CrossOrigin(origins = {"http://127.0.0.1:5173/", "http://localhost:5173/"})
public class LinkController {

	private final LinkService linkService;

	/**
	 * Finds all links.
	 *
	 * @return all links
	 */
	@GetMapping(path = "/all")
	public List<Link> getAllLinks() {
		return linkService.getAllLinks();
	}

	/**
	 * Finds a link.
	 *
	 * @param id id of the link
	 * @return link
	 * @throws ResourceNotFoundException thrown if link is not found
	 */
	@GetMapping(path = "/{id}")
	public ResponseEntity<Link> getLinkById(@PathVariable Long id) throws ResourceNotFoundException {
		return linkService.getLinkById(id);
	}

	/**
	 * Creates a link.
	 *
	 * @param link JSON body of a link
	 * @return created link
	 */
	@PostMapping(path = "")
	public ResponseEntity<Link> addLink(@RequestBody Link link) {
		return linkService.addLink(link);
	}

	/**
	 * Updates a link.
	 *
	 * @param id id of the link to be updated
	 * @param link JSON body of the updated link
	 * @return updated link
	 * @throws ResourceNotFoundException thrown if link is not found
	 */
	@PutMapping(path = "/{id}")
	public ResponseEntity<Link> updateLink(@PathVariable long id, @RequestBody Link link) throws ResourceNotFoundException {
		return linkService.updateLink(id, link);
	}

	/**
	 * Deletes a link.
	 *
	 * @param id id of the link
	 * @throws ResourceNotFoundException thrown if link is not found
	 */
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteLink(@PathVariable long id) throws ResourceNotFoundException {
		return linkService.deleteLink(id);
	}
}
