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

	@GetMapping(path = "/all")
	public List<Link> getAllLinks() {
		return linkService.getAllLinks();
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<Link> getLinkById(@PathVariable Long id) throws ResourceNotFoundException {
		return linkService.getLinkById(id);
	}

	@PostMapping(path = "")
	public ResponseEntity<Link> addLink(@RequestBody Link link) {
		return linkService.addLink(link);
	}

	@PutMapping(path = "/{id}")
	public ResponseEntity<Link> updateLink(@PathVariable long id, @RequestBody Link link) throws ResourceNotFoundException {
		return linkService.updateLink(id, link);
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteLink(@PathVariable long id) throws ResourceNotFoundException {
		return linkService.deleteLink(id);
	}
}
